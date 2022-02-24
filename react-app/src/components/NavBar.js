import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { logout } from '../store/session';
import './NavBar.css'
import Logo from '../images/LoL_icon.svg.png'
const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false);
  const onLogout = async (e) => {
    await dispatch(logout());
    setDropdown(false)
  };
  let NavButtons;
  if (sessionUser) {
    // setDropdown(false)
    NavButtons = (
      <div className='RightSideButtons'>
        <LogoutButton />
      </div>
    )
  } else {
    NavButtons = (
      <div className='RightSideButtons'>
        <NavLink to='/' exact={true} activeClassName='active'>
          Demo
        </NavLink>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </div>
    )
  }
  return (
    <div>
      <nav className='NavBarContainer'>
        <NavLink className={'Logo'} to='/' exact={true} activeClassName='active'>
          LUL
        </NavLink>
        {NavButtons}
        <button id='hamburger' onClick={() => { setDropdown(!dropdown) }}>
          <i className="fas fa-bars"></i>
        </button>
      </nav>
      {dropdown ?
        <div id='Dropdown'>
          {!sessionUser ?
            <>
              <NavLink to='/' exact={true} onClick={() => { setDropdown(false) }} activeClassName='active'>
                Demo
              </NavLink>
              <NavLink to='/login' exact={true} onClick={() => { setDropdown(false) }} activeClassName='active'>
                Login
              </NavLink>
              <NavLink to='/sign-up' exact={true} onClick={() => { setDropdown(false) }} activeClassName='active'>
                Sign Up
              </NavLink>
            </>
            :
            <NavLink to='/login' exact={true} onClick={() => { onLogout() }} activeClassName='active'>
              Logout
            </NavLink>}
        </div>
        : <></>}
    </div>
  );
}

export default NavBar;
