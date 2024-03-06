import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chartview from './Chart';
import Bikes from './Bikes';
import { useLocation } from 'react-router-dom';


export default function Home() {
    const location = useLocation();

    const userName = location.state.username;
    const [chart, setChart] = useState(false);
    const [chartvalue, setChartvalue] = useState([]);
    const [bike, setbike] = useState(false)

    useEffect(() => {
        fetchAdminData()

    }, []);
    console.log('userName', userName)


    const fetchAdminData = async (textData) => {
        let reqData = {};
        console.log('textData', textData);
        let config = {
            method: 'post',
            url: 'http://localhost:8000/api/count',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(reqData)
        };

        if (textData == 'Admin Panel') {
            let response = await axios.request(config)
            console.log('response', response);
            setChartvalue(response.data)
            setChart(true)
            setbike(false)
            //navigate('/home', { userName: data.get('uname') });
        }

        if (textData == 'Bikes') {
            setbike(true)
            setChart(false)
        }


    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Dashboard
                        </Typography>
                        <Button color="inherit">{userName}</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className='home-page'>
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        {["Bikes", "Admin Panel"].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() => fetchAdminData(text)}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                {chart ? <Chartview values={chartvalue} /> : bike ? <Bikes user={userName} /> : ''}
            </div>

        </div>


    )
}
