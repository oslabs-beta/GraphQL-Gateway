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
import { Chart } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import Logger from './Logger';

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

export const data = {
    labels,
    datasets: [
        {
            type: 'line' as const,
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        },
        {
            type: 'bar' as const,
            label: 'Dataset 2',
            backgroundColor: 'rgb(75, 192, 192)',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
        },
        {
            type: 'bar' as const,
            label: 'Dataset 3',
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
    };
}

function Dashboard() {
    const [style, setStyle] = useState<ISState['style']>({
        chartOne: 'block',
        chartTwo: 'none',
        chartThree: 'none',
    });

    const chartOneFn = () => {
        setStyle({
            ...style,
            chartOne: 'block',
            chartTwo: 'none',
            chartThree: 'none',
        });
    };
    const chartTwoFn = () => {
        setStyle({
            ...style,
            chartOne: 'none',
            chartTwo: 'block',
            chartThree: 'none',
        });
    };
    const chartThreeFn = () => {
        setStyle({
            ...style,
            chartOne: 'none',
            chartTwo: 'none',
            chartThree: 'block',
        });
    };

    return (
        <div>
            <div className="loggerBox">
                <div className="loggerGUI">
                    <Logger />
                </div>
            </div>
            <div className="chartBox">
                <div className="chartOne" style={{ display: style.chartOne }}>
                    <h4 className="h4chart">GraphQL Gate using Algorithm One</h4>
                    <Chart type="bar" data={data} />
                </div>
                <div className="chartTwo" style={{ display: style.chartTwo }}>
                    <h4 className="h4chart">GraphQL Gate using Algorithm Two</h4>
                    <Chart type="bar" data={data} />
                </div>
                <div className="chartThree" style={{ display: style.chartThree }}>
                    <h4 className="h4chart">GraphQL Gate using Algorithm Three</h4>
                    <Chart type="bar" data={data} />
                </div>
                <div className="projectSelector">
                    <button onClick={() => chartOneFn()} className="chartBtn" type="button">
                        Algorithm One
                    </button>
                    <button onClick={() => chartTwoFn()} className="chartBtn" type="button">
                        Algorithm Two
                    </button>
                    <button onClick={() => chartThreeFn()} className="chartBtn" type="button">
                        Algorithm Three
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
