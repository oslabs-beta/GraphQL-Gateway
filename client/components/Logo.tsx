import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { SvgIcon } from '@mui/material';

export default function Logo() {
    const navigate = useNavigate();

    const handleClick = (): void => {
        navigate('/');
    };
    return (
        <IconButton onClick={(): void => handleClick()}>
            <SvgIcon>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
        </IconButton>
    );
}
