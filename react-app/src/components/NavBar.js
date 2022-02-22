import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import Logo from '../images/LoL_icon.svg.png'
const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [dropdown, setDropdown] = useState(false);
  let NavButtons;
  if (sessionUser) {
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
          <i class="fas fa-bars"></i>
        </button>
      </nav>
      {dropdown ? <div id='Dropdown'>
        <NavLink to='/' exact={true} onClick={() => { setDropdown(false) }} activeClassName='active'>
          Demo
        </NavLink>
        <NavLink to='/login' exact={true} onClick={() => { setDropdown(false) }} activeClassName='active'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} onClick={() => { setDropdown(false) }} activeClassName='active'>
          Sign Up
        </NavLink>
      </div> : <></>}
    </div>
  );
}

export default NavBar;
