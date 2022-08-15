import React, {useState} from 'react'
import axios from 'axios'

const LoginForm = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login',{ email, password}, { withCredentials: true })
            .then ( res => {
                console.log('user', res.data.user);
                window.location.href = "/dash"
            })
            .catch( err => {console.log(err.response.data); setErrors(err.response.data.errors)} )
    }

    return (
        <div className='max-content'>
            <h2>
                Login
            </h2>
            {errors && <span className='accent'>{errors}🦄</span>}
            <form onSubmit = {handleSubmit}>
                {/* email */}
                <label>
                    Email:
                    <input type='text' onChange={ e => setEmail(e.target.value) }/>
                </label>
                {/* password */}
                <label>
                    Password:
                    <input type='password' onChange={ e => setPassword(e.target.value) } />
                </label>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}

export default LoginForm