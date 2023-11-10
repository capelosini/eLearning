import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import auth from "../utils/auth"
import apiRequests from "../utils/apiRequests"
import Navbar from "../components/navbar"
import { Link } from "react-router-dom"


function Watch(){
    
    document.querySelector('title').innerText = "Learning 🔎"
    
    const [user, setUser] = useState(null)
    const [course, setCourse] = useState(null)
    const [lesson, setLesson] = useState(null)
    const { courseId } = useParams()

    useEffect(() => {
        auth().then((res) => {
            if(!res){ window.location.href="/login" }
            else{ 
                setUser(res)
                apiRequests.post("get/course/"+courseId, {token: res.token}).then(c => {
                    if (!c.error){ 
                        setCourse(c.data)
                        setLesson(c.data.lessons[0])
                    } else{ window.location.href="/account" }
                })
            }
        })
    }, [])

    function changeCourse(index){
        setLesson(course.lessons[index])
    }
    
    return(
        <div>
            {user ? (
                <div>
                    <Navbar />
                    {course ? (
                        <div>
                            <div className="row" style={{padding: 30, textAlign: "center"}}>
                                <h1 className="col">Watch {course.title}</h1>
                                <p>{course.description}</p>
                            </div>
                            <div className="row" style={{padding: 30}}>
                                <div className="col-lg-8" style={{textAlign: "center", marginBottom: 50}}>
                                    <video controls width="100%" height="100%" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
                                    <p>{lesson.description}</p>
                                </div>
                                <div className="col-lg-2">
                                    { course.lessons.map((l, index) => { return <p><a className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={(e) => {changeCourse(index)}}>{l.title}</a></p> }) }
                                </div>
                            </div>
                        </div>

                    ): (<div className="row"></div>)}
                </div>
            ): (<div></div>)}
        </div>
    )
}

export default Watch