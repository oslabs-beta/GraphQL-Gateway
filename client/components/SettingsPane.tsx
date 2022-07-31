import React, { useState } from 'react';

/**
 *
 * Settings Pane allows a dev to change the rate limiting settings to view the effect
 * on changing data.
 *
 * It should have:
 *  a drop-down to select a rate limiting algo
 *  a slider for capacity ingegers
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
    setRateLimiterConfig,
}: SettingsPaneProps) {
    const [rateLimiterType, setRateLimiterType] = useState(rateLimiterConfig.type);
    const [capacity, setCapacity]: [number, React.Dispatch<number>] = useState(
        rateLimiterConfig.options.capacity || 50
    );
    const [refillRate, setRefillRate]: [number, React.Dispatch<number>] = useState(
        rateLimiterConfig.options.refillRate || 50
    );
    const [windowSize, setWindowSize]: [number, React.Dispatch<number>] = useState(
        rateLimiterConfig.options.windowSize || 50
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
        setRateLimiterType(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const updatedConfig: RateLimiterConfig = {
            type: rateLimiterType,
            options: {
                capacity,
            },
        };
        // FIXME: Better way to type guard?
        if (['TOKEN_BUCKET', 'LEAKY_BUCKET'].includes(rateLimiterType)) {
            updatedConfig.options.rate = refillRate;
        } else {
            updatedConfig.options.windowSize = windowSize;
        }

        setRateLimiterConfig(updatedConfig);
        // TODO: Consider closing the side pane
    };

    return (
        <>
            <h1>Settings</h1>
            <select value={rateLimiterType} onChange={onRateLimiterChange}>
                <option value="TOKEN_BUCKET">Fixed Window</option>
                <option value="LEAKY_BUCKET">Leaky Bucket</option>
                <option value="TOKEN_BUCKET">Token Bucket</option>
                <option value="SLIDING_WINDOW_LOG">Sliding Window Log</option>
                <option value="SLIDING_WINDOW_COUNTER">Sliding Window Counter</option>
            </select>
            <Slider name="Capacity" value={capacity} onChange={onCapacityChange} />
            {['TOKEN_BUCKET', 'LEAKY_BUCKET'].includes(rateLimiterType) ? (
                <Slider name="Rate" value={refillRate} onChange={onRefillRateChange} />
            ) : (
                <Slider name="Window Size" value={windowSize} onChange={onWindowSizeChange} />
            )}
            <button id="updateSettings" type="submit" onSubmit={onSubmit}>
                Update
            </button>
            {/* TODO: Add button to set as project default */}
            {/* TODO: Add button to reset to raw data */}
            {/* TODO: Add button to reset to project default */}
        </>
    );
}
