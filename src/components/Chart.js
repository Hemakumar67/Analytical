import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import DatePickerComponent from './Date';
import axios from 'axios';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);



const Chartview = ({ values }) => {
    //console.log('values', values)
    const [dates, setDates] = useState([]);
    //const [val, setVal] = useState(values);
    const [mapvalue, setMapvalue] = useState([])

    const valueSplit = (input) => {
        console.log('input', input)
        let bikeNames = input?.bikeResult.map((i) => i._id);
        let bikeValues = input?.bikeResult.map((i) => i.count);
        //console.log('bikenames', bikeNames, bikeValues);
        let employeeNames = input?.employeeResult.map((i) => i._id);
        let employeeMinutes = input?.employeeResult.map((i) => i.totalMinutes);

        // console.log('employeeNames', employeeNames, employeeMinutes);
        // console.log('bikenames', bikeNames, bikeValues);
        const data = [{
            labels: bikeNames,
            name: "Assembled Bikes Chart view",
            datasets: [
                {
                    label: 'Assembled Bikes Chart (in count)',
                    data: bikeValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                    ],
                },
            ],
        }, {
            labels: employeeNames,
            name: "Employees proctivity Chart view",
            datasets: [
                {
                    label: 'Employees proctivity Chart (in min)',
                    data: employeeMinutes,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)'
                    ],
                },
            ],
        }];
        setMapvalue(data);
    }

    const dateGetting = async (data) => {
        setDates(data);
        //console.log('dates data', data)
        let reqdata = JSON.stringify({
            "start": dates[0],
            "end": dates[1]
        });

        let config = {
            method: 'post',
            url: 'http://localhost:8000/api/count',
            headers: {
                'Content-Type': 'application/json'
            },
            data: reqdata
        };

        let result = await axios.request(config)
        console.log('result', result.data);
        //setVal(result.data.data);
        valueSplit(result.data);


    }

    useEffect(() => {
        valueSplit(values);
    }, [])




    return (
        <div>
            <DatePickerComponent dates={dateGetting} />
            <div className='chart'>{mapvalue?.map((i, idx) => {
                return (
                    <div key={idx}>
                        <h2 >{i.name}</h2>
                        <Bar
                            data={i}
                            options={{
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            }}
                        /></div>
                )
            })}</div>


        </div>
    );
};

export default Chartview;
