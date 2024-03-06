import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Snackbar } from '@mui/material';
import axios from 'axios';

export default function Bikes({ user }) {
    const [bike, setBike] = React.useState('');
    const [bikevalue, setBikevalue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');



    const uname = user

    const handleChange = (event) => {
        setBike(event.target.value);
        if (event.target.value == 'bike1') {
            setBikevalue(50)
        }
        if (event.target.value == 'bike2') {
            setBikevalue(60)
        }
        if (event.target.value == 'bike3') {
            setBikevalue(80)
        }
    };
    const bikeSent = async () => {
        console.log('username', uname)
        // alert(bike)

        let data = JSON.stringify({
            "username": uname,
            "bikeName": bike,
            "minutes": bikevalue
        });

        let config = {
            method: 'post',
            url: 'http://localhost:8000/api/admin-data-create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        let response = await axios.request(config);
        console.log('response', response)
        setBike('');
        setMsg('Bike Successfully Added.')
        setOpen(true);

    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    return (
        <div className='bike-view'>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Bikes</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bike}
                        label="Bikes"
                        onChange={handleChange}
                    >
                        <MenuItem value="bike1" >Bike 1</MenuItem>
                        <MenuItem value="bike2" >Bike 2</MenuItem>
                        <MenuItem value="bike3" >Bike 3</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="text" onClick={bikeSent}>Submit</Button>
            </Box>
            {open && <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={msg}
            //action={action}
            />}
        </div>
    )
}
