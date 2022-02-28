import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { alpha, styled } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import './HomePage.css'


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'green',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    fontSize: '20px',
    backgroundColor: 'white',
    borderRadius: '5px',
    '& .MuiOutlinedInput-root': {
        width: '725px',
        height: '70px',
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
                        placeholder='Search Summoner'
                        value={search}
                        onChange={updateSearch}
                    />
                    :
                    <div>
                        <CssTextField
                            className='SighninAndLoginInput'
                            name='search'
                            type='text'
                            placeholder='Search Summoner'
                            value={search}
                            onChange={updateSearch}
                        />
                        <h1>NA</h1>
                    </div>
                }
            </form>
        </div>
    );
};

export default HomePage;
