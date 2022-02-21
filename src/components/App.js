import React, {useState} from 'react'
import {TOKEN_KEY} from '../constants';
import TopBar from './TopBar';
import Main from './Main';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem(TOKEN_KEY)? true: false
    );

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        console.log('logged out');
        setIsLoggedIn(false);
    };
    
    const loggedIn = (token) => {
        if (token) {
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
