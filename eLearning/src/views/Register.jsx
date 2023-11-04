import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import swal from 'sweetalert'
import Navbar from '../components/navbar'
import apiRequests from '../utils/apiRequests'
import auth from '../utils/auth'

function Register(){
    
    document.querySelector('title').innerText = "Register"

    useEffect(() => {
        auth().then((res) => {
            if(res){ window.location.href="/home" }
        })
    }, [])

    async function handleSubmit(e){
        e.preventDefault()
        
        var email=document.getElementById('email').value
        var password=document.getElementById('password').value
        var fullname=document.getElementById('fullname').value
        var role=document.getElementById('role').value

        var error=false
        var data=await apiRequests.post("register", {email, password, fullname, role}).catch(async(err) => {
            await swal("Error", "Something went Wrong!", "error")
            error=true
        }) 
        if(error) return

        if(data.error) {
            await swal("Error", data.data, "error")
            return
        } else{
            await swal("Success", "Account successfully created!", "success")
            window.location.href="/login"
        }
    }

    return (
        <div>
            <Navbar />

            <section>
                <form onSubmit={handleSubmit}>
                    <span className="formTitle">Register</span>
                    <div>
                        <label className="formLabel">Full Name</label>
                        <input className="formInput" type="text" placeholder="Full Name" id="fullname" required />
                    </div>
                    <div>
                        <label className="formLabel">Role</label>
                        <select id='role' className='formInput'>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                    <label className="formLabel">Email</label>
                    <input className="formInput" type="email" placeholder="Email" id="email" required />
                    <label className="formLabel">Password</label>
                    <input className="formInput" type="password" placeholder="Password" id="password" required />
                    <br/>
                    <button className="btn btn-outline-dark" type="submit">Register</button>
                    <span className="formDontHaveAccountWarning">Already have an account? <Link to='/login' className='formLink'>Click here</Link></span>
                </form>
            </section>
        </div>
    )
}


export default Register;