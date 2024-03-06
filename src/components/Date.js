import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@mui/material/Button';

const DatePickerComponent = ({ dates }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const handleStartDateChange = (date) => {
        const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const formattedDate = utcDate.toISOString().split('T')[0];
        setStartDate(formattedDate);

        console.log('Formatted Date:', formattedDate);
    };
    const handleEndDateChange = (date) => {
        const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const formattedDate = utcDate.toISOString().split('T')[0];
        setEndDate(formattedDate);
        console.log('Formatted Date:', formattedDate);
    };
    const dateChanger = () => {
        dates([startDate, endDate])
    }

    return (
        <div className='date-picker'>
            <div>
                <h2>Start Date Picker</h2>
                <DatePicker
                    selected={startDate}
                    utcOffset={0}
                    onChange={handleStartDateChange}
                    dateFormat="dd/MM/yyyy" // Customize the date format as needed
                />
            </div>
            <div>
                <h2>End Date Picker</h2>
                <DatePicker
                    selected={endDate}
                    utcOffset={0}
                    onChange={handleEndDateChange}
                    dateFormat="dd/MM/yyyy" // Customize the date format as needed
                />
            </div>

            <Button variant="text" className='submit-date' onClick={dateChanger}>Submit</Button>
        </div>
    );
};

export default DatePickerComponent;
