import React from 'react'
import { useState } from 'react'
import './auth.css'
import axios from 'axios'
import {useAuth} from "../../authContext"
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom'


export default function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [lodding, setLodding] = useState(false)

    const {setUser} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLodding(true)
            const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/signup`,{
                username,
                email,
                password
            })
            localStorage.setItem("token",result.data.token)
            localStorage.setItem("userId",result.data.userId)

            setUser(result.data.userId)
            setLodding(false)
            console.log("User registered successfully")
            navigate("/")

        }catch(err){
            console.log("Error while submitting the signup data ",err)
            setLodding(false)
        }
        setUsername('')
        setEmail('')
        setPassword('')
    }

  return (
    <div>
        <section>
            <div className="login-box">
                <form>
                    <h2>Register</h2>
                    <div className="input-box">
                        <span className="icon"><i className="fa-solid fa-user"></i></span>
                        <input
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        type='text' required />
                        <label>Username</label>
                    </div>
                    <div className="input-box">
                        <span className="icon"><i className="fa-solid fa-envelope"></i></span>
                        <input
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        type='email' required />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon"><i className="fa-solid fa-lock"></i></span>
                        <input
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type='password' required />
                        <label>Password</label>
                    </div>
                    <div className="remember-forgot">
                        <label htmlFor=""><input type="checkbox" />Remember me</label>
                        <a href="">Forgot Password?</a>
                    </div>
                    <button
                    onClick={handleSubmit}
                    disabled={lodding}
                    type="submit"
                    >{lodding ? "Lodding..." : "Register"}</button>
                    <div className="signup-link"><p>
                        Already have an account? <Link className='a' to="/auth"> Login now </Link></p>
                    </div>
                </form>
            </div>
        </section>
    </div>
  )
}
