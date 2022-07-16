import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
} from 'chart.js';
import { Chart, Line } from 'react-chartjs-2';
import { SelectedProject } from '../../@types/Interfaces';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};
export interface ISState {
    style: {
        chartOne: string;
        chartTwo: string;
        chartThree: string;
        chartFour: string;
        chartFive: string;
    };
}

export interface IProps {
    queries: ProjectQuery[];
}

// eslint-disable-next-line react/function-component-definition
const ChartBox: React.FC<IProps> = ({ queries }) => {
    /** create the state required for the chart */
    const [depthData, setDepthData] = useState<number[]>([]);
    const [complexityData, setComplexityData] = useState<number[]>([]);
    const [tokenData, setTokenData] = useState<number[]>([]);
    const [blockedData, setblockedData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [smoothingFactor, setSmoothingFactor] = useState<1 | 2 | 4 | 8>(8);
    const [timeRangeDays, setTimeRangeDays] = useState<30 | 90 | 180 | 360>(90);

    /** useEffect will create the chart data to display form the query data */
    useEffect(() => {
        /** create storage for the */
        // y-akis data
        const depthArray: number[] = [];
        const complexityArray: number[] = [];
        const tokenArray: number[] = [];
        const blockedArray: number[] = [];
        // x-axis data is an array of dates
        const labelsArray: string[] = [];

        /** layout the begining of the chart and time increments for each point */
        const currentTime = new Date().valueOf();
        // the time block is determined by:
        //         taking the smallest block of 15 minutes
        //         multiplying that by a user conctrolled smoothing factor
        //         and multilpying that by an automatic smoothing factor detrmined the time rannge in days divided by 30
        const timeBlock = 900000 * smoothingFactor * (timeRangeDays / 30);
        let nextTimeBlock = queries[0].timestamp + timeBlock;
        const startTime = currentTime - timeRangeDays * 86400000; // 1 day * number of days for the time frame

        /** This is a helper function to pad the start and finish of the time block if no queries exist */
        const padChartRange = (from: number, to: number): void => {
            let current = from;
            while (current < to) {
                // push the date for the current timeblock into the labels array
                const date = new Date(current);
                labelsArray.push(`${date.toDateString().slice(0, 10)}, ${date.getHours()}:00`);
                // push all zeros into the data arrays
                depthArray.push(0);
                complexityArray.push(0);
                tokenArray.push(0);
                blockedArray.push(0);
                current += timeBlock;
            }
        };

        /** pad the start of the time range */
        padChartRange(startTime, queries[0].timestamp);

        /** interate through the queries, averaging the query data that falls within the same time block */
        for (let i = 0; i < queries.length; i += 1) {
            // push the date for the current timeblock into the labels array
            const date = new Date(queries[i].timestamp);
            labelsArray.push(`${date.toDateString().slice(0, 10)}, ${date.getHours()}:00`);
            // intialze the sum of depth, complexity, tokens, etc. to be zero
            let count = 0;
            let totalDepth = 0;
            let totalComplexity = 0;
            let totalTokens = 0;
            let totalBlocked = 0;
            // continue to iterate through the queries, totaling the query data for this time block
            while (i < queries.length && queries[i].timestamp < nextTimeBlock) {
                totalDepth += queries[i].depth;
                totalComplexity += queries[i].complexity;
                totalTokens += queries[i].tokens;
                if (!queries[i].success) totalBlocked += 1;
                count += 1;
                i += 1;
            }
            // decrement "i" by 1 after the loop to miss no queries
            i -= 1;
            // push the average depth, complexity, tokens into the appropriate array
            depthArray.push(Math.round(totalDepth / count) || 0);
            complexityArray.push(Math.round(totalComplexity / count) || 0);
            tokenArray.push(Math.round(totalTokens / count) || 0);
            blockedArray.push(Math.round((totalBlocked / count) * 100) || 0);
            // inrement the time block
            nextTimeBlock += timeBlock;
        }

        /** pad the end of the time range, from the last query to the curretn time */
        padChartRange(queries[queries.length - 1].timestamp, currentTime);

        /** set the state of the chart data */
        setDepthData(depthArray);
        setComplexityData(complexityArray);
        setTokenData(tokenArray);
        setblockedData(blockedArray);
        setLabels(labelsArray);
    }, [queries, timeRangeDays, smoothingFactor]);

    /** Configure the datasets for Chart.js */
    // apply these prooperties to all datasets
    const defaultDatasetProperties = {
        type: 'line' as const,
        tension: 0.5,
        pointStyle: 'line',
    };

    const tokens = {
        labels,
        datasets: [
            {
                ...defaultDatasetProperties,
                label: 'Tokens',
                borderColor: 'rgba(255, 99, 132, 0.5)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                data: tokenData,
            },
        ],
    };

    const blocked = {
        labels,
        datasets: [
            {
                ...defaultDatasetProperties,
                label: '% Blocked',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgba(53, 162, 235, 0.5)',
                data: blockedData,
            },
        ],
    };

    const depth = {
        labels,
        datasets: [
            {
                ...defaultDatasetProperties,
                label: 'Depth',
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                data: depthData,
                borderColor: 'rgba(75, 192, 192, 0.8)',
            },
        ],
    };

    const complexity = {
        labels,
        datasets: [
            {
                ...defaultDatasetProperties,
                label: 'Complexity',
                backgroundColor: 'rgba(255, 255, 0, 0.5)',
                borderColor: 'rgba(255, 255, 0, 0.5)',
                data: complexityData,
            },
        ],
    };

    const data = {
        labels,
        datasets: [
            complexity.datasets[0],
            depth.datasets[0],
            blocked.datasets[0],
            tokens.datasets[0],
        ],
    };

    const [style, setStyle] = useState<ISState['style']>({
        chartOne: 'none',
        chartTwo: 'none',
        chartThree: 'none',
        chartFour: 'none',
        chartFive: 'block',
    });
    const chartOneFn = () => {
        setStyle({
            ...style,
            chartOne: 'block',
            chartTwo: 'none',
            chartThree: 'none',
            chartFour: 'none',
            chartFive: 'none',
        });
    };
    const chartTwoFn = () => {
        setStyle({
            ...style,
            chartOne: 'none',
            chartTwo: 'block',
            chartThree: 'none',
            chartFour: 'none',
            chartFive: 'none',
        });
    };
    const chartThreeFn = () => {
        setStyle({
            ...style,
            chartOne: 'none',
            chartTwo: 'none',
            chartThree: 'block',
            chartFour: 'none',
            chartFive: 'none',
        });
    };
    const chartFourFn = () => {
        setStyle({
            ...style,
            chartOne: 'none',
            chartTwo: 'none',
            chartThree: 'none',
            chartFour: 'block',
            chartFive: 'none',
        });
    };
    const chartFiveFn = () => {
        setStyle({
            ...style,
            chartOne: 'none',
            chartTwo: 'none',
            chartThree: 'none',
            chartFour: 'none',
            chartFive: 'block',
        });
    };
    return (
        <div id="chartBoxInside">
            <div className="projectSelector">
                <button onClick={() => setTimeRangeDays(30)} className="chartBtn" type="button">
                    Last 30 Days
                </button>
                <button onClick={() => setTimeRangeDays(90)} className="chartBtn" type="button">
                    Last 90 Days
                </button>
                <button onClick={() => setTimeRangeDays(180)} className="chartBtn" type="button">
                    Last 180 Days
                </button>
                <button onClick={() => setTimeRangeDays(360)} className="chartBtn" type="button">
                    Last 360 Days
                </button>
                <button onClick={() => setSmoothingFactor(1)} className="chartBtn" type="button">
                    Smooth 1
                </button>
                <button onClick={() => setSmoothingFactor(2)} className="chartBtn" type="button">
                    Smooth 2
                </button>
                <button onClick={() => setSmoothingFactor(4)} className="chartBtn" type="button">
                    Smooth 3
                </button>
                <button onClick={() => setSmoothingFactor(8)} className="chartBtn" type="button">
                    Smooth 4
                </button>
            </div>
            <div className="chartOne chartVisual" style={{ display: style.chartOne }}>
                <Line options={options} data={tokens} />
            </div>
            <div className="chartTwo chartVisual" style={{ display: style.chartTwo }}>
                <Line options={options} data={depth} />
            </div>
            <div className="chartThree chartVisual" style={{ display: style.chartThree }}>
                <Line options={options} data={complexity} />
            </div>
            <div className="chartFour chartVisual" style={{ display: style.chartFour }}>
                <Line options={options} data={blocked} />
            </div>
            <div className="chartFive chartVisual" style={{ display: style.chartFive }}>
                <Line data={data} />
            </div>
            <div className="projectSelector">
                <button onClick={() => chartOneFn()} className="chartBtn" type="button">
                    Tokens
                </button>
                <button onClick={() => chartTwoFn()} className="chartBtn" type="button">
                    Depth
                </button>
                <button onClick={() => chartThreeFn()} className="chartBtn" type="button">
                    Complexity
                </button>
                <button onClick={() => chartFourFn()} className="chartBtn" type="button">
                    % Blocked
                </button>
                <button onClick={() => chartFiveFn()} className="chartBtn" type="button">
                    Combined
                </button>
            </div>
        </div>
    );
};

export default ChartBox;
