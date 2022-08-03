import React, { useState } from 'react';

/**
 *
 * Settings Pane allows a dev to change the rate limiting settings to view the effect
 * on changing data.
 *
 * It should have:
 *  a drop-down to select a rate limiting algo
 *  a slider for capacity integers
 *  a slider for refresh rate (bucket algos) tokends / s
 *  a slider for window size (ms) (displayed as seconds)
 *
 * Initial settings are passed in (saved in db);
 * User can update settings and click an "Update". No live update as this can be
 * expensive with the amount of queries.
 * button to apply the new settigns
 *
 */

function Slider({
    name,
    value,
    displayValue,
    onChange,
    min,
    max,
    unit,
}: {
    name: string;
    value: number;
    displayValue: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    min: number;
    max: number;
    unit: string;
}) {
    return (
        <div id={`${name}Slider`} className="slidecontainer">
            {name} : {displayValue} {unit}
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                className="slider"
                onChange={onChange}
            />
        </div>
    );
}

export default function SettingsPane({
    rateLimiterConfig,
    rateLimiterLoading,
    setRateLimiterConfig,
}: SettingsPaneProps) {
    const [rateLimiterType, setRateLimiterType]: [
        RateLimiterType,
        React.Dispatch<React.SetStateAction<RateLimiterType>>
    ] = useState(rateLimiterConfig?.type || 'None');

    // Bucket or window capacity in tokens
    const [capacity, setCapacity]: [number, React.Dispatch<number>] = useState(
        rateLimiterConfig?.options.capacity || 10
    );

    // Rate for bucket algos in tokens / second
    const [refillRate, setRefillRate]: [number, React.Dispatch<number>] = useState(
        rateLimiterConfig?.options?.refillRate || 1
    );

    // Window size in seconds
    const [windowSize, setWindowSize]: [number, React.Dispatch<number>] = useState(
        rateLimiterConfig?.options.windowSize || 1
    );

    const onCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCapacity(Number(e.target.value));
    };

    const onRefillRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRefillRate(Number(e.target.value));
    };

    const onWindowSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // convert from ms to seconds
        setWindowSize(Number(e.target.value) / 1000);
    };

    const onRateLimiterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRateLimiterType(e.target.value as RateLimiterType);
    };

    const onUpdate = (e: React.FormEvent<HTMLButtonElement>, saveSettings = false) => {
        e.preventDefault();
        // TODO: Window size math
        const updatedConfig: RateLimiterConfig = {
            type: rateLimiterType,
            options: {
                capacity,
                ...((rateLimiterType as WindowType) && { windowSize: windowSize * 1000 }),
                ...((rateLimiterType as BucketType) && { refillRate }),
            },
        };
        setRateLimiterConfig(updatedConfig, saveSettings);
    };

    return (
        <>
            <h3>Settings</h3>
            {rateLimiterLoading ? (
                <div className="loader" />
            ) : (
                <div className="panelColumn">
                    <select
                        className="panelDropdown"
                        value={rateLimiterType}
                        onChange={onRateLimiterChange}
                    >
                        <option disabled value="None">
                            Select an Option
                        </option>
                        <option value="FIXED_WINDOW">Fixed Window</option>
                        <option value="LEAKY_BUCKET">Leaky Bucket</option>
                        <option value="TOKEN_BUCKET">Token Bucket</option>
                        <option value="SLIDING_WINDOW_LOG">Sliding Window Log</option>
                        <option value="SLIDING_WINDOW_COUNTER">Sliding Window Counter</option>
                    </select>
                    <Slider
                        name="Capacity"
                        value={capacity}
                        displayValue={capacity}
                        onChange={onCapacityChange}
                        min={0}
                        max={500}
                        unit="tokens"
                    />
                    {['TOKEN_BUCKET', 'LEAKY_BUCKET'].includes(rateLimiterType) ? (
                        <Slider
                            name="Rate"
                            value={refillRate}
                            displayValue={refillRate}
                            onChange={onRefillRateChange}
                            min={0}
                            max={100}
                            unit="tokens/s"
                        />
                    ) : (
                        <Slider
                            name="Window Size"
                            value={windowSize * 1000} // Slider goes down to millisecond for granularity
                            displayValue={windowSize} // Slider goes down to millisecond for granularity
                            onChange={onWindowSizeChange}
                            min={0}
                            max={600000} // 10 minutes
                            unit="s"
                        />
                    )}
                    <div className="panelButtonGroup">
                        <button
                            className="panelButton"
                            id="updateSettings"
                            type="button"
                            onClick={onUpdate}
                        >
                            Apply
                        </button>
                        <button className="panelButton" disabled id="resetQueries" type="button">
                            Clear
                        </button>
                        <button
                            className="panelButton"
                            id="updateDefault"
                            type="button"
                            onClick={(e) => onUpdate(e, true)}
                        >
                            Update Project Default
                        </button>
                        {/* TODO: Implement functionality for the below buttons */}
                        <button className="panelButton" disabled id="resetDefault" type="button">
                            Reset Project Default
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
