import React from 'react';
import { Toolbar, Typography, Box, AppBar, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
    const navigate = useNavigate();

    const handleClick = (): void => {
        navigate('/');
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="transparent" elevation={0}>
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
                        Profile
                    </Typography>
                    <Button color="inherit" onClick={(): void => handleClick()}>
                        Sign out
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
