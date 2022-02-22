import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'blue',
  },
  '& label.Mui': {
    color: 'blue',
  },
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
    <div className='SighnUpandLoginContaier'>
      <form onSubmit={onSignUp} className='SighnUpandLogin'>
        <div className='sighnUpdivs'>
          {usererror ? <span className='errors'>{usererror}</span> : <></>}
          <div>
            <CssTextField
              className='SighninAndLoginInput'
              id="demo-helper-text-misaligned-no-helper"
              onChange={updateUsername}
              value={username}
              name='username'
              label="Username" />
          </div>
        </div>
        <div className='sighnUpdivs'>
          {emailerror ? <span className='errors'>{emailerror}</span> : <></>}
          <div>
            <CssTextField
              className='SighninAndLoginInput'
              id="demo-helper-text-misaligned-no-helper"
              onChange={updateEmail}
              value={email}
              name='email'
              label="Email" />
          </div>
        </div>
        <div className='sighnUpdivs'>
          {passworderror ? <span className='errors'>{passworderror}</span> : <></>}
          <div>
            <CssTextField
              className='SighninAndLoginInput'
              id="demo-helper-text-misaligned-no-helper"
              onChange={updatePassword}
              value={password}
              name='password'
              type='password'
              label="Password" />
          </div>
        </div>
        <div className='sighnUpdivs'>
          <div>
            <CssTextField
              className='SighninAndLoginInput'
              id="demo-helper-text-misaligned-no-helper"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              name='repeat_password'
              type='password'
              label="Repeat Password" />
          </div>
        </div>
        <Button variant="contained" type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
