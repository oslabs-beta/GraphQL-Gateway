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
    const [smoothingFactor, setSmoothingFactor] = useState<1 | 2 | 4 | 8 | 10>(8);
    const [timeRangeDays, setTimeRangeDays] = useState<30 | 90 | 180 | 360>(90);

    /** useEffect will create the chart data to display form the query data */
    useEffect(() => {
        /** create storage for the */
        const depthArray: number[] = [];
        const complexityArray: number[] = [];
        const tokenArray: number[] = [];
        const blockedArray: number[] = [];
        const labelsArray: string[] = [];

        /** layout the begining of the chart and time increments for each point */
        const currentTime = new Date().valueOf();
        const timeBlock = 1800000 * smoothingFactor; // 15 minutes * the smoothing factor applied
        let nextTimeBlock = queries[0].timestamp + timeBlock;
        const startTime = currentTime - timeRangeDays * 86400000; // 1 day * number of days for the time frame

        /** This is a helper function to pad the start and finish of the time block if no queries exist */
        const padChartRange = (from: number, to: number): void => {
            let current = from;
            while (current < to) {
                labelsArray.push(new Date(current).toDateString());
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
            labelsArray.push(new Date(queries[i].timestamp).toDateString());
            let count = 0;
            let totalDepth = 0;
            let totalComplexity = 0;
            let totalTokens = 0;
            let totalBlocked = 0;
            while (i < queries.length && queries[i].timestamp < nextTimeBlock) {
                totalDepth += queries[i].depth;
                totalComplexity += queries[i].complexity;
                totalTokens += queries[i].tokens;
                if (!queries[i].success) totalBlocked += 1;
                count += 1;
                i += 1;
            }
            i -= 1;
            depthArray.push(Math.round(totalDepth / count) || 0);
            complexityArray.push(Math.round(totalComplexity / count) || 0);
            tokenArray.push(Math.round(totalTokens / count) || 0);
            blockedArray.push(Math.round((totalBlocked / count) * 100) || 0);
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
    const tokens = {
        labels,
        datasets: [
            {
                type: 'line' as const,
                label: 'Tokens',
                borderColor: 'rgba(255, 99, 132, 0.5)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                data: tokenData,
                tension: 0.5,
                pointStyle: 'line',
            },
        ],
    };

    const blocked = {
        labels,
        datasets: [
            {
                type: 'line' as const,
                label: 'Blocked',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgba(53, 162, 235, 0.5)',
                data: blockedData,
                tension: 0.5,
                pointStyle: 'line',
            },
        ],
    };

    const depth = {
        labels,
        datasets: [
            {
                type: 'line' as const,
                label: 'Depth',
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                data: depthData,
                borderColor: 'rgba(75, 192, 192, 0.8)',
                tension: 0.5,
                pointStyle: 'line',
            },
        ],
    };

    const complexity = {
        labels,
        datasets: [
            {
                type: 'line' as const,
                label: 'Complexity',
                backgroundColor: 'rgba(255, 255, 0, 0.5)',
                borderColor: 'rgba(255, 255, 0, 0.5)',
                data: complexityData,
                tension: 0.5,
                pointStyle: 'line',
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
                <Chart type="bar" options={options} data={blocked} />
            </div>
            <div className="chartFive chartVisual" style={{ display: style.chartFive }}>
                <Chart type="bar" data={data} />
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
                    Blocked
                </button>
                <button onClick={() => chartFiveFn()} className="chartBtn" type="button">
                    Combined
                </button>
            </div>
        </div>
    );
};

export default ChartBox;
