import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import swal from 'sweetalert'
import Navbar from '../components/navbar'
import apiRequests from '../utils/apiRequests'
import auth from '../utils/auth'

function Login(){
    
    document.querySelector('title').innerText = "Login"

    useEffect(() => {
        auth().then((res) => {
            if(res){ window.location.href="/home" }
        })
    }, [])

    async function handleSubmit(e){
        e.preventDefault()
        
        var email=document.getElementById('email').value
        var password=document.getElementById('password').value

        var error=false
        var data=await apiRequests.post("login", {email, password}).catch(async(err) => {
            await swal("Error", "Email or Password Wrong!", "error")
            error=true
        })
        if(error) return

        if(data.error) {
            await swal("Error", data.data, "error")
            return
        } else{
            localStorage.setItem("token", data.data)
            await swal("Success", "You're successfully logged in!", "success")
            window.location.href="/home"
        }
    }

    return (
        <div>
            <Navbar />
            <section>
                <form onSubmit={handleSubmit}>
                    <span className="formTitle">Login</span>
                    <label className="formLabel">Email</label>
                    <input className="formInput" type="email" placeholder="Email" id="email" required />
                    <label className="formLabel">Password</label>
                    <input className="formInput" type="password" placeholder="Password" id="password" required />
                    <br/>
                    <button className="btn btn-outline-dark" type="submit">Login</button>
                    <span className="formDontHaveAccountWarning">Don't have an account? <Link to='/register' className='formLink'>Click here</Link></span>
                </form>
            </section>
        </div>
    )
}

export default Login;