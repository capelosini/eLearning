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
                                <div className="col-sm-6">
                                    <img style={{width: "100%", borderRadius: 5, border: "solid 2px black"}} src={course.image} alt="Course img"/>
                                </div>
                                <div className="col" style={{padding: 20}}>
                                    <h1>{course.title}</h1>
                                    <p>{course.description}</p>
                                    <p>Lessons: <strong>{course.lessons.length}</strong></p>
                                    <p>Duration: <strong>{course.duration}h</strong></p>
                                    <p>Price: <strong>R${course.price}</strong></p>
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