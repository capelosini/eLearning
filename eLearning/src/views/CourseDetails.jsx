import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import auth from "../utils/auth"
import apiRequests from "../utils/apiRequests"


function CourseOverview(){

    const { courseId } = useParams()

    const [user, setUser] = useState(null)
    const [course, setCourse] = useState(null)

    useEffect(() => {
        auth().then((res) => {
            if(!res){ window.location.href="/login" }
            else{ 
                setUser(res)
                apiRequests.post("get/course/"+courseId, {token: res.token}).then((res) => { if (!res.error){ setCourse(Object(res.data))} })
            }
        })
    }, [])

    return(
        <div>
            {user ? (
                <div>
                    <Navbar />
                    <section className="section courseOverviewSection">
                        {course ? (
                            <div className="row">
                                <div className="col-md-3">
                                    <img style={{width: "100%"}} src={course.image} alt="Course img"/>
                                </div>
                                <div className="col-md-8">
                                    <h1>{course.title}</h1>
                                    <p>{course.description}</p>
                                    <p>Lessons: {course.lessons.length}</p>
                                    <p>Duration: {course.duration}h</p>
                                    <p>Price: R${course.price}</p>
                                    <Link to={"/checkout/"+courseId}><button className="getStartedBtn">Buy now!</button></Link>
                                </div>
                            </div>
                        ): (<h1 style={{textAlign: "center"}}>Course not found!</h1>)}
                    </section>
                </div>
            ): (<div></div>)}
        </div>
    )
}

export default CourseOverview