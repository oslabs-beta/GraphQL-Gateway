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
        // chartOne: string;
        chartTwo: string;
        chartThree: string;
        chartFour: string;
    };
}

export interface IProps {
    queries: ProjectQuery[];
}

// eslint-disable-next-line react/function-component-definition
const ChartBox: React.FC<IProps> = ({ queries }) => {
    // const timeFromProjectProps: number[] = [];
    // const depthFromProjectProps: number[] = [];
    // const complexityFromProjectProps: number[] = [];
    // const labels: string[] = [];

    const [depthData, setDepthData] = useState<number[]>([]);
    const [complexityData, setcomplexityData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    useEffect(() => {
        const depthArray: number[] = [];
        const complexityArray: number[] = [];
        const labelsArray: string[] = [];
        const currentTime = new Date().valueOf();
        const timeBlock = 1800000 * 4; // 60 minutes
        let nextTimeBlock = queries[0].timestamp + timeBlock;
        for (let i = 0; i < queries.length; i += 1) {
            labelsArray.push(String(queries[i].timestamp));
            let count = 0;
            let totalDepth = 0;
            let totalComplexity = 0;
            while (i < queries.length && queries[i].timestamp < nextTimeBlock) {
                totalDepth += queries[i].depth;
                totalComplexity += queries[i].complexity;
                count += 1;
                i += 1;
            }
            i -= 1;
            depthArray.push(Math.round(totalDepth / count) || 0);
            complexityArray.push(Math.round(totalComplexity / count) || 0);
            nextTimeBlock += timeBlock;
        }
        setDepthData(depthArray);
        setcomplexityData(complexityArray);
        setLabels(labelsArray);
    }, [queries]);

    // eslint-disable-next-line array-callback-return
    // queries!.map((query) => {
    //     // timeFromProjectProps.push(query.timestamp / 100);
    //     depthFromProjectProps.push(query.depth);
    //     complexityFromProjectProps.push(query.complexity);
    // });

    // const time = {
    //     labels,
    //     datasets: [
    //         {
    //             label: 'Time to execute query',
    //             data: timeFromProjectProps,
    //             borderColor: 'rgb(255, 99, 132)',
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },
    //     ],
    // };

    const depth = {
        labels,
        datasets: [
            {
                label: 'Depth of query',
                data: depthData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(75, 192, 192)',
                tension: 0.5,
                pointStyle: 'line',
            },
        ],
    };

    const complexity = {
        labels,
        datasets: [
            {
                label: 'Time to execute query',
                data: complexityData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(53, 162, 235)',
                tension: 0.5,
                pointStyle: 'line',
            },
        ],
    };

    const data = {
        labels,
        datasets: [
            // {
            //     type: 'line' as const,
            //     label: 'Time',
            //     borderColor: 'rgb(255, 99, 132)',
            //     borderWidth: 2,
            //     fill: false,
            //     data: timeFromProjectProps,
            // },
            {
                type: 'line' as const,
                label: 'Depth',
                backgroundColor: 'rgb(75, 192, 192)',
                data: depthData,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                tension: 0.5,
                pointStyle: 'line',
            },
            {
                type: 'line' as const,
                label: 'Complexity',
                backgroundColor: 'rgb(53, 162, 235)',
                data: complexityData,
                tension: 0.5,
                pointStyle: 'line',
            },
        ],
    };

    const [style, setStyle] = useState<ISState['style']>({
        // chartOne: 'block',
        chartTwo: 'none',
        chartThree: 'none',
        chartFour: 'block',
    });

    // const chartOneFn = () => {
    //     setStyle({
    //         ...style,
    //         chartOne: 'block',
    //         chartTwo: 'none',
    //         chartThree: 'none',
    //         chartFour: 'none',
    //     });
    // };
    const chartTwoFn = () => {
        setStyle({
            ...style,
            // chartOne: 'none',
            chartTwo: 'block',
            chartThree: 'none',
            chartFour: 'none',
        });
    };
    const chartThreeFn = () => {
        setStyle({
            ...style,
            // chartOne: 'none',
            chartTwo: 'none',
            chartThree: 'block',
            chartFour: 'none',
        });
    };
    const chartFourFn = () => {
        setStyle({
            ...style,
            // chartOne: 'none',
            chartTwo: 'none',
            chartThree: 'none',
            chartFour: 'block',
        });
    };
    return (
        <div id="chartBoxInside">
            <div className="projectSelector">
                {/* <button onClick={() => chartOneFn()} className="chartBtn" type="button">
                    Today
                </button> */}
                <button onClick={() => chartTwoFn()} className="chartBtn" type="button">
                    Last 7 Days
                </button>
                <button onClick={() => chartThreeFn()} className="chartBtn" type="button">
                    Last 6 Months
                </button>
                <button onClick={() => chartFourFn()} className="chartBtn" type="button">
                    YTD
                </button>
            </div>
            {/* <div className="chartOne chartVisual" style={{ display: style.chartOne }}>
                <Line options={options} data={time} />
            </div> */}
            <div className="chartTwo chartVisual" style={{ display: style.chartTwo }}>
                <Line options={options} data={depth} />
            </div>
            <div className="chartThree chartVisual" style={{ display: style.chartThree }}>
                <Line options={options} data={complexity} />
            </div>
            <div className="chartFour chartVisual" style={{ display: style.chartFour }}>
                <Chart type="bar" data={data} />
            </div>
            <div className="projectSelector">
                {/* <button onClick={() => chartOneFn()} className="chartBtn" type="button">
                    Time
                </button> */}
                <button onClick={() => chartTwoFn()} className="chartBtn" type="button">
                    Depth
                </button>
                <button onClick={() => chartThreeFn()} className="chartBtn" type="button">
                    Complexity
                </button>
                <button onClick={() => chartFourFn()} className="chartBtn" type="button">
                    Combined
                </button>
            </div>
        </div>
    );
};

export default ChartBox;
