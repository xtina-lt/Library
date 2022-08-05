import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Nav = ({logged, setLogged}) => {
    const {user, setUser} = useState(null)
    useEffect(()=>{    
        axios .get('http://localhost:8000/api/current-user', { withCredentials: true })
        .then((res) => { setUser(res.data);})
        .catch((err) => console.log(err));
    },[logged])
    
    const handleLogout = e => {
        axios.get()
            .then()
            .catch()
    }
    return(
        <nav>
            <a href="/">
                Home
            </a>
            <a href="https://github.com/xtina-lt">
                GitHub
            </a>
            {
                (user)?
                <a href='/logout'>
                    Logout
                </a>
                :
                <a href="/login">
                Login
                </a>
            }
        </nav>
    )
}

export default Nav