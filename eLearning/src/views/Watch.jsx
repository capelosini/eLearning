import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import auth from "../utils/auth"
import apiRequests from "../utils/apiRequests"
import Navbar from "../components/navbar"


function Watch(){
    
    document.querySelector('title').innerText = "Learning 🔎"
    
    const [user, setUser] = useState(null)
    const [course, setCourse] = useState(null)
    const [lesson, setLesson] = useState(null)
    const [instructor, setInstructor] = useState(null)
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
                        apiRequests.get("public/user/"+c.data.instructorId).then(inst => {
                            setInstructor(inst.data)
                        })
                    } else{ window.location.href="/account" }
                })
            }
        })
    }, [])

    function changeCourse(index){
        setLesson(course.lessons[index])
        document.querySelector("video").src="http://"+window.location.hostname+":8080/video/"+courseId+"/"+lesson.video+"/"+user.token
    }
    
    return(
        <div>
            {user ? (
                <div>
                    <Navbar />
                    {course ? (
                        <div>
                            <div className="row" style={{padding: 30, textAlign: "center"}}>
                                <h1 className="col">{course.title}</h1>
                                <p>{course.description}</p>
                            </div>
                            <div className="row" style={{padding: 30}}>
                                <div className="col-lg-8" style={{textAlign: "center", marginBottom: 50}}>
                                    {/* <video controls width="100%" height="100%" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" /> */}
                                    <video controls width="100%" height="100%" src={"http://"+window.location.hostname+":8080/video/"+courseId+"/"+lesson.video+"/"+user.token} style={{borderRadius: 10, border: "3px solid black"}} />
                                    <div className="row">
                                        {instructor ? (
                                            <div className="col" style={{textAlign: "left"}}>
                                                <img src={instructor.profileUrl} style={{width: 60, borderRadius: 50, margin: 10}} />
                                                <label>{instructor.fullname}</label>
                                            </div>
                                        ): (<div></div>)}
                                        <div className="col">
                                            <p style={{marginTop: 27}}>{lesson.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2" style={{marginTop: 70}}>
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