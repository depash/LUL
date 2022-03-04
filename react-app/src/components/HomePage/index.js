import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { alpha, styled } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import { PopperUnstyled } from '@mui/base';
import './HomePage.css'
import { GetStats } from '../../store/Stats';


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'green',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    backgroundColor: 'white',
    // borderBottomLeftRadius: '5px',
    '& .MuiOutlinedInput-root': {
        fontSize: '30px',
        width: '625px',
        height: '50px',
        '& fieldset': {
            border: 'none',
        },
        '&:hover fieldset': {
            border: 'none',
        },
        '&.Mui-focused fieldset': {
            border: 'none',
        },
    },
});
const PhoneCssTextField = styled(OutlinedInput)({
    '& label.Mui-focused': {
        color: 'green',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    backgroundColor: 'white',
    width: '725px',
    height: '175px',
    fontSize: '50px',
    border: 'none',
    '& .MuiOutlinedInput-root': {
        border: 'none',
        '& fieldset': {
            border: 'none',
        },
        '&:hover fieldset': {
            border: 'none',
        },
        '&.Mui-focused fieldset': {
            border: 'none',
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
});
const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};

const StyledButton = styled('button')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: bold;
    box-sizing: border-box;
    height: 50px;
    width: 100px;
    background: #092c3a;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 0.75em;
    margin: 0.5em;
    padding: 10px;
    text-align: left;
    line-height: 1.5;
    color: white;

    &:hover {
      background: #092c3a;
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }

    &.${selectUnstyledClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
    }

    &.${selectUnstyledClasses.expanded} {
      &::after {
        content: '▴';
      }
    }

    &::after {
      content: '▾';
      float: right;
    }

    & img {
      margin-right: 10px;
    }
    `,
);

const StyledListbox = styled('ul')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 5px;
    margin: 10px 0;
    width: 250px;
    height: 300px;
    background: #092c3a;
    border: 1px solid #c28f2a;
    border-radius: 0.75em;
    color: white;
    overflow-y: scroll;
    outline: 0px;
    `,
);

const StyledOption = styled(OptionUnstyled)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 0.45em;
    cursor: default;

    &:last-of-type {
      border-bottom: none;
    }

    &.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }

    &.${optionUnstyledClasses.highlighted} {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }

    &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }

    &.${optionUnstyledClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }

    &:hover:not(.${optionUnstyledClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    & img {
      margin-right: 10px;
    }
    `,
);


const StyledButtonPhone = styled('button')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: bold;
    box-sizing: border-box;
    height: 50px;
    width: 100px;
    background: #092c3a;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 0.75em;
    margin: 0.5em;
    padding: 10px;
    text-align: left;
    line-height: 1.5;
    color: white;

    &:hover {
      background: #092c3a;
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }

    &.${selectUnstyledClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
    }

    &.${selectUnstyledClasses.expanded} {
      &::after {
        content: '▴';
      }
    }

    &::after {
      content: '▾';
      float: right;
    }

    & img {
      margin-right: 10px;
    }
    `,
);

const StyledListboxPhone = styled('ul')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 5px;
    margin: 10px 0;
    min-width: 320px;
    max-height: 400px;
    background: #092c3a;
    border: 1px solid #c28f2a;
    border-radius: 0.75em;
    color: white;
    overflow: auto;
    outline: 0px;
    `,
);

const StyledOptionPhone = styled(OptionUnstyled)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 0.45em;
    cursor: default;

    &:last-of-type {
      border-bottom: none;
    }

    &.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }

    &.${optionUnstyledClasses.highlighted} {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }

    &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }

    &.${optionUnstyledClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }

    &:hover:not(.${optionUnstyledClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    & img {
      margin-right: 10px;
    }
    `,
);

const StyledPopper = styled(PopperUnstyled)`
    z-index: 1;
  `;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
    const components = {
        Root: StyledButton,
        Listbox: StyledListbox,
        Popper: StyledPopper,
        ...props.components,
    };

    return <SelectUnstyled {...props} ref={ref} components={components} />;
});

const CustomSelectPhone = React.forwardRef(function CustomSelect(props, ref) {
    const components = {
        Root: StyledButtonPhone,
        Listbox: StyledListboxPhone,
        Popper: StyledPopper,
        ...props.components,
    };

    return <SelectUnstyled {...props} ref={ref} components={components} />;
});

CustomSelect.propTypes = {
    /**
     * The components used for each slot inside the Select.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components: PropTypes.shape({
        Listbox: PropTypes.elementType,
        Popper: PropTypes.func,
        Root: PropTypes.elementType,
    }),
};

const countries = [
    {
        code: 'NA',
    },
    {
        code: 'EUN',
    },
    {
        code: 'EUW',
    },
    {
        code: 'LAS',
    },
    {
        code: 'LAN',
    },
    {
        code: 'OCE',
    },
    { code: 'BR', label: 'Brazil', phone: '55' },
    { code: 'KR', label: 'Korea, Republic of', phone: '82' },
    {
        code: 'JP',
        label: 'Japan',
        phone: '81',
        suggested: true,
    },
    { code: 'TR', label: 'Turkey', phone: '90' },
    { code: 'RU', label: 'Russian Federation', phone: '7' },
]
const HomePage = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('');
    const [value, setValue] = useState('NA');
    const matches = useMediaQuery('(min-width:650px) and (-webkit-min-device-pixel-ratio: 2)');
    const updateSearch = (e) => {
        setSearch(e.target.value);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const data = await dispatch(GetStats(search, value));
        if (data) {
            setErrors(data);
        }
    };
    return (
        <div id='homePageContainer'>
            <div id='imgContainer'>
                <div id='img'>

                </div>
            </div>
            <div id='formContainer'>
                <form onSubmit={submitForm}>
                    {matches ?
                        <div className='searchAndRegionSelectContaienr'>
                            <PhoneCssTextField
                                className='SighninAndLoginInput'
                                name='search'
                                type='text'
                                placeholder='Search Summoner'
                                value={search}
                                onChange={updateSearch}
                            >
                            </PhoneCssTextField>
                            <CustomSelectPhone>
                                {countries.map((c) => (
                                    <StyledOptionPhone key={c.code} value={c.code}>
                                        {c.label && <img
                                            loading="lazy"
                                            width="20"
                                            src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                                            srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
                                            alt={`Flag of ${c.label}`}
                                        />}
                                        {c.code}
                                    </StyledOptionPhone>
                                ))}
                            </CustomSelectPhone>
                        </div>
                        :
                        <div className='searchAndRegionSelectContaienr'>
                            <CssTextField
                                className='SighninAndLoginInput'
                                name='search'
                                type='text'
                                placeholder='Search Summoner'
                                value={search}
                                onChange={updateSearch}
                            >
                            </CssTextField>
                            <CustomSelect value={value} onChange={setValue}>
                                {countries.map((c) => (
                                    <StyledOption key={c.code} value={c.code}>
                                        {c.label && <img
                                            loading="lazy"
                                            width="20"
                                            src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                                            srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
                                            alt={`Flag of ${c.label}`}
                                        />}
                                        {c.code}
                                    </StyledOption>
                                ))}
                            </CustomSelect>
                        </div>
                    }
                </form>
            </div >
        </div >
    );
};

export default HomePage;
