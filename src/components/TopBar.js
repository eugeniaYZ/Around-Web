import React from 'react';
import logo from '../assets/images/logo.svg';
import {USERNAME} from '../constants';

import {LogoutOutlined, StarFilled} from '@ant-design/icons';

//rsc
function TopBar(props) {
    const {isLoggedIn, handleLogout} = props;
    const username = isLoggedIn? localStorage.getItem(USERNAME):'';
    console.log(username);
    return (
        <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <span className='App-title'>Around Web</span>
            {
                isLoggedIn?
                    <>
                        <StarFilled className='user_logo'/>
                        <span className='username'>{username}</span>
                        <LogoutOutlined className='logout' onClick={handleLogout}/>
                    </>
                    :null
            }
        </header>
    )
}

export default TopBar