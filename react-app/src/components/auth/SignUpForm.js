import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'blue',
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
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    height: '100%',
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
                label="Username" />
              : <CssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                onChange={updateUsername}
                value={username}
                name='username'
                label="Username" />}
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
                label="Email" />
              : <CssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                onChange={updateEmail}
                value={email}
                name='email'
                label="Email" />}
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
                label="Password" />
              : <CssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                onChange={updatePassword}
                value={password}
                name='password'
                type='password'
                label="Password" />}

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
                label="Repeat Password" />
              : <CssTextField
                className='SighninAndLoginInput'
                id="demo-helper-text-misaligned-no-helper"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                name='repeat_password'
                type='password'
                label="Repeat Password" />}
          </div>
        </div>
        <Button variant="contained" type='submit'>Sign Up</Button>
      </form>
    </div >
  );
};

export default SignUpForm;
