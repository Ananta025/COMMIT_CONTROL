import React,{useState, useEffect} from 'react'
import './auth.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../authContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function LogIn() {

    useEffect(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        setUser(null)
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const {setUser} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoading(true)
            const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/signin`,{
                email,
                password
            })
            localStorage.setItem("token",result.data.token)
            localStorage.setItem("userId",result.data.userId)
            setUser(result.data.userId)
            setLoading(false)
            console.log("User logged in successfully")
            navigate("/")
        }catch(err){
            console.log("Error while submitting the login data ",err)
            setLoading(false)
        }
        setEmail('')
        setPassword('')
    }
  return (

    <div>
        <section>
        <div className="login-box">
            <form>
                <h2>Login</h2>
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
                disabled={loading}
                type="submit">{loading ? "Lodding..." : "Login"}</button>
                <div className="signup-link"><p>
                    Don't have an account? <Link className="a" to="/signup">Signup now</Link></p>
                </div>
            </form>
        </div>
        </section>
    </div>
  )
}