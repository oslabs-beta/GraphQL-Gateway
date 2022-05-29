import React from 'react';
import Logger from './Logger';
import ChartBox from './ChartBox';

function Dashboard() {
    return (
        <div id="dashWrapper">
            <div className="loggerBox">
                <div className="loggerGUI">
                    <Logger />
                </div>
            </div>
            <div className="chartBox">
                <ChartBox />
            </div>
        </div>
    );
}

export default Dashboard;
