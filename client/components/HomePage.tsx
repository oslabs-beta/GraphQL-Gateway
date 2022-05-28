import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, AppBar, Box, Toolbar, IconButton, Grid, Typography } from '@mui/material';
import '../../public/styles.scss';

export default function HomePage() {
    const navigate = useNavigate();

    const handleLogin = (): void => {
        navigate('/login');
    };
    const handleSignup = (): void => {
        navigate('/signup');
    };
    const handleAbout = (): void => {
        navigate('/about');
    };
    const handlePoweredBy = (): void => {
        navigate('/team');
    };
    const handleHome = (): void => {
        navigate('/');
    };

    return (
        <div>
            <Grid sx={{ display: 'flex' }}>
                <AppBar position="fixed" color="transparent" elevation={0}>
                    <Toolbar>
                        <Grid alignItems="center" justifyContent="center">
                            <IconButton onClick={handleHome}>
                                <img src="logo.png" alt="logo" />
                            </IconButton>
                        </Grid>

                        <Box component="div" sx={{ flexGrow: 1 }} />
                        <Button style={{ marginRight: 100 }} type="submit" onClick={handleAbout}>
                            About
                        </Button>
                        <Button
                            style={{ marginRight: 100 }}
                            type="submit"
                            onClick={handlePoweredBy}
                        >
                            Powered by
                        </Button>
                        <Button style={{ marginRight: 100 }} type="submit" onClick={handleLogin}>
                            Login
                        </Button>
                        <Button
                            style={{ marginRight: 50 }}
                            type="submit"
                            variant="contained"
                            onClick={handleSignup}
                        >
                            Signup
                        </Button>
                    </Toolbar>
                </AppBar>
            </Grid>

            <Box left="200px" position="absolute" bottom="370px">
                <Typography variant="h1" color="#283593">
                    LET&apos;S MAKE SOMETHING GREAT
                </Typography>
            </Box>
        </div>
    );
}
