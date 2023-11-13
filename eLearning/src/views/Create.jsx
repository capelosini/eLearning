import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import auth from '../utils/auth'
import apiRequests from '../utils/apiRequests'
import MiniForm from '../components/lessonMiniForm'

function Create(){

    document.querySelector('title').innerText = "New Course"

    const [user, setUser] = useState(null)
    const [lessons, setLessons] = useState([])
    const [tempCoverImage, setTempCoverImage] = useState("")

    useEffect(() => {
        auth().then((res) => {
            if(!res){ window.location.href="/login" }
            else{ 
                setUser(res)
                if (res.type != "teacher"){ window.location.href="/account" }
            }
        })
    }, [])

    function changeCoverImage(e){
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setTempCoverImage(reader.result)
        }
    }

    function removeLesson(e, index=0){
        setLessons(lessons.filter((_, filterIndex) => {return filterIndex != index}))
    }

    return (
        <div>
            {user && user.type == "teacher" ? (
                <div>
                    <Navbar />

                    <h1 style={{textAlign: 'center', padding: "50px 0 0 0"}}>➕ New Course</h1>

                    <form>
                        <h3 style={{padding: 20}}>Main Information</h3>
                        <input maxLength="29" style={{textAlign: 'center'}} className="formInput" type="text" placeholder="Course Title" id="title" required />
                        <textarea placeholder="Course Description" id="description" required></textarea>
                        <input className="formInput" type="number" id="price" placeholder='Price (R$)' style={{margin: 20}} required />

                        <div style={{padding: 20, margin: 15, borderRadius: 5, border: "1px solid black"}}>
                            <p>Put here the cover image</p>
                            <input type="file" id="imageCover" accept="image/*" onChange={changeCoverImage} required />
                            <img src={tempCoverImage} rel='' style={{borderRadius: 5, display: "block", margin: "auto", width: 200}} />
                        </div>

                        <h3 style={{padding: 30}}>Setup Lessons</h3>
                        <div id="lessonsFormsDiv">
                            {lessons.map((l, index) => { return (<div style={{padding: 10}}><MiniForm lessonIndex={index} /></div>) })}
                        </div>
                        <button type="button" style={{borderRadius: 15, padding: 10, border: "2px solid black", margin: 20}} onClick={(e) => { setLessons([...lessons, {}]) }}>➕</button>
                        <button type="button" style={{borderRadius: 15, padding: 10, border: "2px solid black", margin: 20}} onClick={ removeLesson }>❌</button>

                    </form>
                </div>
            ): (
                <div></div>
            )}
        </div>
    )
}

export default Create