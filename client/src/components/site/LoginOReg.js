import React from 'react'
// import axios from 'axios'
import Header from './Header'
import Nav from './Nav'
import LoginForm from '../users/LoginForm'
import RegisterForm from '../users/RegisterForm'

const LoginOReg = (props) => {
    return(
        <>
            <Header header="XTINA.CODES"/>
            <Nav/>
            <main>
                <RegisterForm/>
                <LoginForm/>
            </main>
        </>
    )
}

export default LoginOReg