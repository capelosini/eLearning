import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import swal from 'sweetalert'
import Navbar from '../components/navbar'
import apiRequests from "../utils/apiRequests"
import Course from '../components/course'
import auth from '../utils/auth'

function Account(){

    document.querySelector('title').innerText = "My Account"

    // const [user, setUser] = useState({fullname: "", type: "", boughtCoursesId: [], email: "", token: "", profileUrl: ""})
    const [user, setUser] = useState(null)
    const [userCourses, setUserCourses] = useState([])
    const [profileUrl, setProfileUrl] = useState("")

    useEffect(() => {
        auth().then((res) => {
            if(!res){ window.location.href="/login" }
            else{ 
                setUser(res)
                setProfileUrl(res.profileUrl) 
                apiRequests.post("get/courses", {token: res.token}).then((res2) => { setUserCourses(Object(res2.data).filter(e => { if(res.boughtCoursesId.includes(e.courseId)){ return e } })) })
            }
        })
    }, [])

    function changeProfile(e){
        var p = Math.floor(Math.random() * 13) + 1
        setProfileUrl("/profiles/" + p + ".svg")
    }

    async function saveProfile(e){
        var error=false
        var data=await apiRequests.post("edit/profile", {profileUrl, token: localStorage.getItem("token")}).catch(async(err) => {
            await swal("Error", "Something went Wrong!", "error")
            error=true
        })
        if(error) return
        if(data.error) {
            await swal("Error", data.data, "error")
        } else{
            swal("Success", data.data, "success")
        }
    }

    async function logoutFunction(e){
        var confirmation = await swal({
            title: "Are you sure?",
            text: "You'll logout from your account!",
            icon: "warning",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes!",
            cancelButtonText: "No!",
            confirmButtonColor: '#0c0',
            cancelButtonColor: '#d33'
        })
        if(confirmation){
            localStorage.removeItem("token")
            await swal("Success!", "Logout succeed!", "success")
            document.location.href="/login"
        }
    }


    return(
        <div>
            { user ? (
                <div>
                    <Navbar />
                    <div className="row" style={{padding: 40}}>
                        <div className="col" style={{textAlign: "right", padding: 50}}>
                            <h1>Account Details</h1>
                            <div style={{padding: 20}}>
                                <p>Name: {user.fullname}</p>
                                <p>Email: {user.email}</p>
                                <p>XP: {user.boughtCoursesId.length}</p>
                                <button className='btn btn-outline-danger' onClick={logoutFunction}>Logout</button>
                            </div>
                        </div>
                        <div className="col" style={{textAlign: "center", border: "2px solid black", borderRadius: 5, padding: 15}}>
                            <p>Update picture</p>
                            <img style={{width: 250}} src={profileUrl} id="profilePic" onClick={changeProfile}/>
                            <button style={{margin: 30}} className="btn btn-outline-success" onClick={saveProfile}>Save!</button>
                        </div>
                    </div>
                    <hr />
                    <div className="row" style={{textAlign: "center"}}>
                        <h1 style={{padding: 20}}>My courses</h1>
                        {userCourses.length>0 ? (
                            userCourses.map((c) => { return <Course title={c.title} rating={c.rating} price={"R$"+c.price} url={"/course/"+c.courseId} img={c.image} /> })
                        ): (
                            <div>
                                <p style={{textAlign: "center"}}>No bought courses yet ☹️</p>
                                <Link to="/home" className="btn btn-outline-dark">Start learning now</Link>
                            </div>
                        )}
                    </div>
                </div>
            ): (<div></div>)}
        </div>
    )
}

export default Account