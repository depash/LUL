import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

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
      <form onSubmit={onLogin} className='SighnUpandLogin'>
        <div>
          {errors.length ? <span className='errors'>Password or Email Incorrect</span> : <></>}
        </div>
        <div>
          <div>
            <TextField
              className='SighninAndLoginInput'
              id="demo-helper-text-misaligned-no-helper"
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              label="Email" />
          </div>
        </div>
        <div>
          <div>
            <TextField
              className='SighninAndLoginInput'
              id="demo-helper-text-misaligned-no-helper"
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              label="Password" />
          </div>
        </div>
        <Button variant="contained" type='submit'>Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
