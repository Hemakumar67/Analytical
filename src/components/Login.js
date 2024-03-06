import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();




export default function Login() {
    const navigate = useNavigate();
    const usernames = ['employee1', 'employee2', 'employee3', 'employee4', 'employee5'];
    const [uname, setUnmae] = useState('');
    const [pass, setpass] = useState('');

    const [login, setLogin] = useState(false)

    const [posts, setPosts] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!usernames.includes(data.get('uname'))) {
            alert('username not found');
            //return
        } else {
            let reqData = JSON.stringify({
                "user": data.get('uname'),
                "pass": data.get('password')
            });

            let config = {
                method: 'post',
                url: 'http://localhost:8000/api/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: reqData
            };

            let response = await axios.request(config)
            console.log('response', response);
            if (response.data) {
                setUnmae(data.get('uname'))
                setLogin(true)
                navigate('/home', { state: { username: data.get('uname') } });
            }

        }


    };


    return (
        <>
            {/* {!login ?  */}
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="uname"
                                label="User Name"
                                name="uname"
                                autoComplete="uname"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            {/* : <Home username={uname} />} */}

        </>

    );
}