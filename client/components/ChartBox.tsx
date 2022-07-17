import React, { useState, useMemo } from 'react';
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
import { Line, Bar } from 'react-chartjs-2';

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
    // TODO: if there is no data, the chart axis should start at 0. This is not working
    options: { scales: { y: { suggestedMin: 0 } } },
};
export interface ISState {
    style: {
        chartOne: string;
        chartTwo: string;
        chartThree: string;
        chartFour: string;
        chartFive: string;
        chartSix: string;
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
    const [volumeData, setVolumeData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [smoothingFactor, setSmoothingFactor] = useState<1 | 3 | 6 | 12>(12);
    const [timeRangeDays, setTimeRangeDays] = useState<1 | 7 | 30 | 360>(30);

    /** useEffect will create the chart data to display form the query data */
    useMemo(() => {
        /** create storage for the */
        // y-akis data
        const depthArray: number[] = [];
        const complexityArray: number[] = [];
        const tokenArray: number[] = [];
        const blockedArray: number[] = [];
        const volumeArray: number[] = [];
        // x-axis data is an array of dates
        const labelsArray: string[] = [];

        /** layout the begining of the chart and time increments for each point */
        const currentTime = new Date().valueOf();
        // the time block is determined by: taking the smallest block of 15 minutes and multiplying that by a user conctrolled smoothing factor
        const timeBlock = 900000 * smoothingFactor * ((timeRangeDays + 30) / 30);
        let startTime = currentTime - timeRangeDays * 86400000; // 1 day * number of days for the time frame

        /** process time blocks for the chart while the start time of the current time block is less than the current date */
        // The counter i will track the index we are on in the queries array
        let i = 0;
        while (startTime < currentTime) {
            // specify the end time for the current time block
            const nextTimeBlock = startTime + timeBlock;
            // push the date for the current timeblock into the labels array
            const date = new Date(startTime);
            labelsArray.push(`${date.toDateString().slice(0, 10)}, ${date.getHours()}:00`);
            // intialze the sum of depth, complexity, tokens, etc. to be zero
            let count = 0;
            let totalDepth = 0;
            let totalComplexity = 0;
            let totalTokens = 0;
            let totalBlocked = 0;
            let totalVolume = 0;

            /** process the queries that lie within this time block */
            while (i < queries.length && queries[i].timestamp < nextTimeBlock) {
                if (queries[i].timestamp > startTime) {
                    totalDepth += queries[i].depth;
                    totalComplexity += queries[i].complexity;
                    totalTokens += queries[i].tokens;
                    totalVolume += 1;
                    if (!queries[i].success) totalBlocked += 1;
                    count += 1;
                }
                i += 1;
            }
            // push the average depth, complexity, tokens into the appropriate array
            depthArray.push(Math.round(totalDepth / count) || 0);
            complexityArray.push(Math.round(totalComplexity / count) || 0);
            tokenArray.push(Math.round(totalTokens / count) || 0);
            blockedArray.push(Math.round((totalBlocked / count) * 100) || 0);
            const volumePerHour = totalVolume / (timeBlock / 3600000);
            volumeArray.push(Number(volumePerHour.toFixed(2)));
            // increment the start time for the next timeblock
            startTime = nextTimeBlock;
        }

        /** set the state of the chart data */
        setDepthData(depthArray);
        setComplexityData(complexityArray);
        setTokenData(tokenArray);
        setblockedData(blockedArray);
        setLabels(labelsArray);
        setVolumeData(volumeArray);
    }, [queries, timeRangeDays, smoothingFactor]);

    /** Configure the datasets for Chart.js */
    // apply these prooperties to all datasets
    const defaultDatasetProperties = {
        type: 'line' as const,
        tension: 0.5,
        elements: { point: { radius: 0 } },
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
    const volume = {
        labels,
        datasets: [
            {
                ...defaultDatasetProperties,
                // type: 'Bar' as const,
                label: 'Volume (query / h)',
                borderColor: 'rgba(128, 0, 128, 0.5)',
                backgroundColor: 'rgba(128, 0, 128, 0.5)',
                data: volumeData,
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
            // volume.datasets[0],
        ],
    };

    const [style, setStyle] = useState<ISState['style']>({
        chartOne: 'none',
        chartTwo: 'none',
        chartThree: 'none',
        chartFour: 'none',
        chartFive: 'none',
        chartSix: 'block',
    });
    const chartOneFn = () => {
        setStyle({
            ...style,
            chartOne: 'block',
            chartTwo: 'none',
            chartThree: 'none',
            chartFour: 'none',
            chartFive: 'none',
            chartSix: 'none',
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
            chartSix: 'none',
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
            chartSix: 'none',
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
            chartSix: 'none',
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
            chartSix: 'none',
        });
    };
    const chartSixFn = () => {
        setStyle({
            ...style,
            chartOne: 'none',
            chartTwo: 'none',
            chartThree: 'none',
            chartFour: 'none',
            chartFive: 'none',
            chartSix: 'block',
        });
    };
    return (
        <div id="chartBoxInside">
            <div className="projectSelector">
                <button onClick={() => setTimeRangeDays(1)} className="chartBtn" type="button">
                    Last 24 h
                </button>
                <button onClick={() => setTimeRangeDays(7)} className="chartBtn" type="button">
                    Last Week
                </button>
                <button onClick={() => setTimeRangeDays(30)} className="chartBtn" type="button">
                    Last Month
                </button>
                <button onClick={() => setTimeRangeDays(360)} className="chartBtn" type="button">
                    Last Year
                </button>
                <button onClick={() => setSmoothingFactor(1)} className="chartBtn" type="button">
                    Smooth 1
                </button>
                <button onClick={() => setSmoothingFactor(3)} className="chartBtn" type="button">
                    Smooth 2
                </button>
                <button onClick={() => setSmoothingFactor(6)} className="chartBtn" type="button">
                    Smooth 3
                </button>
                <button onClick={() => setSmoothingFactor(12)} className="chartBtn" type="button">
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
                <Line options={options} data={volume} />
            </div>
            <div className="chartSix chartVisual" style={{ display: style.chartSix }}>
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
                    Volume
                </button>
                <button onClick={() => chartSixFn()} className="chartBtn" type="button">
                    Combined
                </button>
            </div>
        </div>
    );
};

export default ChartBox;
