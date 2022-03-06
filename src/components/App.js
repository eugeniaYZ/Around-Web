import React, {useState} from 'react'
import {TOKEN_KEY, USERNAME} from '../constants';
import {message} from 'antd';
import TopBar from './TopBar';
import Main from './Main';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem(TOKEN_KEY)? true: false
    );


    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USERNAME);
        setIsLoggedIn(false);
        message.success('Logout succeed')
    };
    
    const loggedIn = (token, username) => {
        if (token) {
            localStorage.setItem(USERNAME, username);
            localStorage.setItem(TOKEN_KEY, token);
            setIsLoggedIn(true);
        }
    };
    
    return (
        <div className='App'>
            <TopBar isLoggedIn={isLoggedIn} handleLogout={logout}/>
            <Main isLoggedIn={isLoggedIn} handleLogin={loggedIn}/>
        </div>
    );
}

export default App;
