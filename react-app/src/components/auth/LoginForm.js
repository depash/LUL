import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import useMediaQuery from '@mui/material/useMediaQuery';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  backgroundColor: 'white',
  borderRadius: '5px',
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
const PhoneCssTextField = styled(TextField)({
  '& label': {
    color: '#c28f2c',
    fontWeight: 'bold',
    fontSize: '50px'
  },
  zIndex: '0',
  '& .MuiOutlinedInput-input': {
    height: '80%'
  },
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  backgroundColor: 'white',
  borderRadius: '10px',
  '& .MuiOutlinedInput-root': {
    width: '725px',
    height: '175px',
    fontSize: '50px',
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

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const matches = useMediaQuery('(min-width:650px) and (-webkit-min-device-pixel-ratio: 2)');
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }
  return (
    <div className='SighnUpandLoginContaier'>
      <form onSubmit={onLogin} id='Login'>
        <div>
          {errors.length ? <span className='errors'>Password or Email Incorrect</span> : <></>}
        </div>
        <div>
          <div>
            {matches ?
              <PhoneCssTextField
                className='SighninAndLoginInput'
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
              : <CssTextField
                className='SighninAndLoginInput'
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />}
          </div>
        </div>
        <div>
          <div>
            {matches ?
              <PhoneCssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              : <CssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />}
          </div>
        </div>
        <Button variant="contained" type='submit'>Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
