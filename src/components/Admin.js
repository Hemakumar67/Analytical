// AdminDashboard.js

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Admin = () => {
    const [bikeData, setBikeData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);

    // Fetch data from your backend API
    useEffect(() => {
        // Fetch bike data
        // Fetch employee data
    }, []);

    const bikeChartData = {
        labels: bikeData.map((entry) => entry.date),
        datasets: [
            {
                label: 'Number of Bikes Assembled',
                data: bikeData.map((entry) => entry.assembledBikes),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const employeeChartData = {
        labels: employeeData.map((entry) => entry.date),
        datasets: [
            {
                label: 'Employee Production',
                data: employeeData.map((entry) => entry.production),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>

            {/* Bike Chart */}
            <div>
                <h3>Bike Assembling Data</h3>
                <Line data={bikeChartData} />
            </div>

            {/* Employee Chart */}
            <div>
                <h3>Employee Production Data</h3>
                <Line data={employeeChartData} />
            </div>
        </div>
    );
};

export default Admin;
