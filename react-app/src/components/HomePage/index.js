import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { alpha, styled } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import useMediaQuery from '@mui/material/useMediaQuery';
import './HomePage.css'

const CssTextField = styled(OutlinedInput)({
    '& label.Mui-focused': {
        display: 'none'
    },
    '& label.Mui-focused': {
        color: '#c28f2c',
    },
    '& label': {
        color: '#c28f2c',
        fontWeight: 'bold',
    },
    backgroundColor: 'white',
    borderRadius: '5px',
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    width: '725px',
    height: '70px',
    fontSize: '20px',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: '#c28f2c',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#c28f2c',
        },
    },
});
const PhoneCssTextField = styled(OutlinedInput)({
    '& label.Mui-focused': {
        color: 'blue',
    },
    '& label.Mui-focused': {
        color: '#c28f2c',
    },
    '& label': {
        color: '#c28f2c',
        fontWeight: 'bold',
        fontSize: '50px'
    },
    backgroundColor: 'white',
    borderRadius: '5px',
    width: '725px',
    height: '175px',
    fontSize: '50px',
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-input': {
        height: '80%'
    }
});

const HomePage = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('');
    const matches = useMediaQuery('(min-width:650px) and (-webkit-min-device-pixel-ratio: 2)');
    const updateSearch = (e) => {
        setSearch(e.target.value);
    };
    return (
        <div id='homePageContainer'>
            <form>
                {matches ?
                    <PhoneCssTextField
                        className='SighninAndLoginInput'
                        name='search'
                        type='text'
                        placeholder='Summuner Name'
                        value={search}
                        onChange={updateSearch}
                    />
                    : <CssTextField
                        className='SighninAndLoginInput'
                        name='search'
                        type='text'
                        placeholder='Summuner Name'
                        value={search}
                        onChange={updateSearch}
                    />}
            </form>
        </div>
    );
};

export default HomePage;
