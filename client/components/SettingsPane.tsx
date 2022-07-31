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
    onChange,
}: {
    name: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
    const min = 0;
    const max = 100;
    return (
        <div id={`${name}Slider`} className="slidecontainer">
            {name}
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

    const [capacity, setCapacity]: [number, React.Dispatch<number>] = useState(
        rateLimiterConfig?.options.capacity || 50
    );
    const [refillRate, setRefillRate]: [number, React.Dispatch<number>] = useState(
        rateLimiterConfig?.options?.refillRate || 50
    );
    const [windowSize, setWindowSize]: [number, React.Dispatch<number>] = useState(
        rateLimiterConfig?.options.windowSize || 50
    );

    const onCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCapacity(Number(e.target.value));
    };

    const onRefillRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRefillRate(Number(e.target.value));
    };

    const onWindowSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWindowSize(Number(e.target.value));
    };

    const onRateLimiterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRateLimiterType(e.target.value as RateLimiterType);
    };

    const onUpdate = (e: React.FormEvent<HTMLButtonElement>, saveSettings = false) => {
        e.preventDefault();
        const updatedConfig: RateLimiterConfig = {
            type: rateLimiterType,
            options: {
                capacity,
                ...((rateLimiterType as WindowType) && { windowSize }),
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
                <>
                    <select value={rateLimiterType} onChange={onRateLimiterChange}>
                        <option disabled value="None">
                            Select an Option
                        </option>
                        <option value="FIXED_WINDOW">Fixed Window</option>
                        <option value="LEAKY_BUCKET">Leaky Bucket</option>
                        <option value="TOKEN_BUCKET">Token Bucket</option>
                        <option value="SLIDING_WINDOW_LOG">Sliding Window Log</option>
                        <option value="SLIDING_WINDOW_COUNTER">Sliding Window Counter</option>
                    </select>
                    <Slider name="Capacity" value={capacity} onChange={onCapacityChange} />
                    {['TOKEN_BUCKET', 'LEAKY_BUCKET'].includes(rateLimiterType) ? (
                        <Slider name="Rate" value={refillRate} onChange={onRefillRateChange} />
                    ) : (
                        <Slider
                            name="Window Size"
                            value={windowSize}
                            onChange={onWindowSizeChange}
                        />
                    )}
                    <div className="panelButtonGroup">
                        <button
                            className="panelButton"
                            disabled
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
                </>
            )}
        </>
    );
}
