import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import Course from '../components/course'
import auth from '../utils/auth'
import apiRequests from '../utils/apiRequests'

function Home(){

    document.querySelector('title').innerText = "Home"

    const [user, setUser] = useState(null)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        auth().then((res) => {
            if(!res){ window.location.href="/login" }
            else{ 
                setUser(res) 
                apiRequests.post("get/courses", {token: res.token}).then((res) => { setCourses(Object(res.data)) })
            }
        })
    }, [])

    return(
        <div>
            {user ? (
                <div>
                    <Navbar />
                    <div className='searchBarDiv'>
                        <input type='text' className='searchBar' placeholder='Search' />
                    </div>
                    <section className='section homeHeadSection'>
                        <h1>Welcome back, {user.fullname.split(' ')[0]}!</h1>
                        <h3>📚</h3>
                    </section>
                    <section className='section indexCoursesSection'>
                        <hr />
                        <h2>Courses Library</h2>
                        <div className='coursesViewDiv row'>
                            {courses.length>0 ? (
                                courses.map((course) => { return <Course title={course.title} rating={course.rating} price={"R$"+course.price} url={"/course/"+course.courseId} img={course.image} /> })
                            ): (<p style={{textAlign: "center"}}>No courses yet ☹️</p>)}
                        </div>
                    </section>
                </div>
            ): (<div></div>)}
        </div>
    )
}




export default Home