import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
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
    height: '155px',
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

const SignUpForm = () => {
  const [usererror, setuserErrors] = useState([]);
  const [emailerror, setemailErrors] = useState([]);
  const [passworderror, setpasswordErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const matches = useMediaQuery('(min-width:650px) and (-webkit-min-device-pixel-ratio: 2)');

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password, repeatPassword));
    if (data) {
      if (data.username) {
        setuserErrors(data.username)
      }
      else {
        setuserErrors([])
      }
      if (data.email) {
        setemailErrors(data.email)
      }
      else {
        setemailErrors([])
      }
      if (data.password) {
        setpasswordErrors(data.password)
      }
      else {
        setpasswordErrors([])
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }
  return (
    <div className='SighnUpandLoginContaier' >
      <form onSubmit={onSignUp} id='SighnUp'>
        <div className='sighnUpdivs'>
          {usererror ? <span className='errors'>{usererror}</span> : <></>}
          <div>
            {matches ?
              <PhoneCssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                onChange={updateUsername}
                value={username}
                name='username'
                placeholder='Username' />
              : <CssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                onChange={updateUsername}
                value={username}
                name='username'
                placeholder='Username' />}
          </div>
        </div>
        <div className='sighnUpdivs'>
          {emailerror ? <span className='errors'>{emailerror}</span> : <></>}
          <div>
            {matches ?
              <PhoneCssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                onChange={updateEmail}
                value={email}
                name='email'
                placeholder='Email' />
              : <CssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                onChange={updateEmail}
                value={email}
                name='email'
                placeholder='Email' />}
          </div>
        </div>
        <div className='sighnUpdivs'>
          {passworderror ? <span className='errors'>{passworderror}</span> : <></>}
          <div>
            {matches ?
              <PhoneCssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                onChange={updatePassword}
                value={password}
                name='password'
                type='password'
                placeholder='Password' />
              : <CssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                onChange={updatePassword}
                value={password}
                name='password'
                type='password'
                placeholder='Password' />}

          </div>
        </div>
        <div className='sighnUpdivs'>
          <div>
            {matches ?
              <PhoneCssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                name='repeat_password'
                type='password'
                placeholder='Repeat Password' />
              : <CssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                name='repeat_password'
                type='password'
                placeholder='Repeat Password' />}
          </div>
        </div>
        <Button variant="contained" type='submit'>Sign Up</Button>
      </form>
    </div >
  );
};

export default SignUpForm;
