import React, { useState } from 'react';
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
import { faker } from '@faker-js/faker';
import { Projects } from './Interfaces';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);
const labels = ['Query1', 'Query2', 'Query3', 'Query4', 'Query5', 'Query6', 'Query7'];

export const time = {
    labels,
    datasets: [
        {
            label: 'Time to execute query',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export const depth = {
    labels,
    datasets: [
        {
            label: 'Depth of query',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
        },
    ],
};

export const complexity = {
    labels,
    datasets: [
        {
            label: 'Time to execute query',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235)',
        },
    ],
};

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

export const data = {
    labels,
    datasets: [
        {
            type: 'line' as const,
            label: 'Time',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        },
        {
            type: 'bar' as const,
            label: 'Depth',
            backgroundColor: 'rgb(75, 192, 192)',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
        },
        {
            type: 'bar' as const,
            label: 'Complexity',
            backgroundColor: 'rgb(53, 162, 235)',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        },
    ],
};

export interface ISState {
    style: {
        chartOne: string;
        chartTwo: string;
        chartThree: string;
        chartFour: string;
    };
}

export interface IProps {
    projects: Projects['projects'];
}

const ChartBox: React.FC<IProps> = ({ projects }) => {
    console.log('these are projects man', projects);
    const [style, setStyle] = useState<ISState['style']>({
        chartOne: 'block',
        chartTwo: 'none',
        chartThree: 'none',
        chartFour: 'none',
    });

    const chartOneFn = () => {
        setStyle({
            ...style,
            chartOne: 'block',
            chartTwo: 'none',
            chartThree: 'none',
            chartFour: 'none',
        });
    };
    const chartTwoFn = () => {
        setStyle({
            ...style,
            chartOne: 'none',
            chartTwo: 'block',
            chartThree: 'none',
            chartFour: 'none',
        });
    };
    const chartThreeFn = () => {
        setStyle({
            ...style,
            chartOne: 'none',
            chartTwo: 'none',
            chartThree: 'block',
            chartFour: 'none',
        });
    };
    const chartFourFn = () => {
        setStyle({
            ...style,
            chartOne: 'none',
            chartTwo: 'none',
            chartThree: 'none',
            chartFour: 'block',
        });
    };
    return (
        <div id="chartBoxInside">
            <div className="chartOne chartVisual" style={{ display: style.chartOne }}>
                <h4 className="h4chart">GraphQL Gate using Algorithm One</h4>
                <Line options={options} data={time} />
            </div>
            <div className="chartTwo chartVisual" style={{ display: style.chartTwo }}>
                <h4 className="h4chart">GraphQL Gate using Algorithm Two</h4>
                <Line options={options} data={depth} />
            </div>
            <div className="chartThree chartVisual" style={{ display: style.chartThree }}>
                <h4 className="h4chart">GraphQL Gate using Algorithm Three</h4>
                <Line options={options} data={complexity} />
            </div>
            <div className="chartFour chartVisual" style={{ display: style.chartFour }}>
                <h4 className="h4chart">GraphQL Gate using Algorithm Four</h4>
                <Chart type="bar" data={data} />
            </div>
            <div className="projectSelector">
                <button onClick={() => chartOneFn()} className="chartBtn" type="button">
                    Time
                </button>
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
