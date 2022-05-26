import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
        },
    },
};

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Denied',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 1)',
        },
        {
            label: 'Approved',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: '#3ed9ca',
        },
        {
            label: 'Approved',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: '#3ed9ca',
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
                    <h3>This is the logger box</h3>
                    <h3>I am not sure how this will look, so I left it as it is</h3>
                </div>
            </div>
            <div className="chartBox">
                <div className="chartOne" style={{ display: style.chartOne }}>
                    <h4 className="h4chart">GraphQL Gate using Algorithm One</h4>
                    <Bar options={options} data={data} />
                </div>
                <div className="chartTwo" style={{ display: style.chartTwo }}>
                    <h4 className="h4chart">GraphQL Gate using Algorithm Two</h4>
                    <Bar options={options} data={data} />
                </div>
                <div className="chartThree" style={{ display: style.chartThree }}>
                    <h4 className="h4chart">GraphQL Gate using Algorithm Three</h4>
                    <Bar options={options} data={data} />
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
