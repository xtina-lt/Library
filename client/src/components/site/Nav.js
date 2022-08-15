import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';

const Nav = props => {
    const [logged, setLogged] = useState(Cookies.get('stars') || null)

    const handleLogout = e => {
        axios.post('http://localhost:8000/api/logout', { withCredentials: true })
        Cookies.remove('userToken'); 
        Cookies.remove('stars') 
        Cookies.remove('userId') 
        setLogged(null); 
        window.location.href = "/"
    }

    return (
        <nav>
            <a href="/">
                Home
            </a>
            <a href="https://github.com/xtina-lt" target="_blank" rel="noopener">
                GitHub
            </a>
            <a href='/gifshop'>
                GifShop
            </a>
            {
                (logged) ? 
                    <>
                    <a href={`/dash`}>
                    Dash 💜 <span id='stars'>{Cookies.get('stars')}</span>
                    </a> 
                    <button onClick={handleLogout}>
                            Logout
                    </button>
                    </>
                    :
                    <a href="/login">
                        Login
                    </a>
            }
        </nav>
    )
}

export default Nav