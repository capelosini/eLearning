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

    function changedLesson(e, index=0){
        lessons[index][e.target.name] = e.target.value
        setLessons(lessons)
    }

    function changedVideo(e, index=0){
        lessons[index]["video"]=e.target.files[0]
        setLessons(lessons)
    }

    function handleSubmit(e){
        e.preventDefault()
        if (lessons.length > 0){

            if (document.getElementById("imageCover").files[0].size > 1000000){
                swal("Error", "Cover image too large! limit: 1MB", "error")
                return
            }

            var formData = new FormData()
            formData.append("course", JSON.stringify({title: document.getElementById("title").value, description: document.getElementById("description").value, price: document.getElementById("price").value, coverImage: tempCoverImage, category: document.getElementById("category").value}))
            formData.append("lessons", JSON.stringify(lessons))
            formData.append("token", user.token)
            lessons.forEach((lesson, index) => {
                formData.append("video"+index, lesson.video)
                if (index == lessons.length-1){
                    apiRequests.post("create/course", formData, true).then(async res => {
                        if(res.error) await swal("Error", res.data, "error")
                        else{ await swal("Success", "Course created successfully!", "success"); window.location.href="/home" }
                    })
                }
            })
        } else{
            swal("Error", "Not enough lessons!", "error")
        }
    }

    return (
        <div>
            {user && user.type == "teacher" ? (
                <div>
                    <Navbar />

                    <h1 style={{textAlign: 'center', padding: "50px 0 0 0"}}>➕ New Course</h1>

                    <form onSubmit={handleSubmit}>
                        <h3 style={{padding: 20}}>Main Information</h3>
                        <input maxLength="29" style={{textAlign: 'center'}} className="formInput" type="text" placeholder="Course Title" id="title" required />
                        <textarea placeholder="Course Description" id="description" required></textarea>
                        <input className="formInput" type="number" id="price" step="0.01" placeholder='Price (R$)' style={{margin: 20}} required />
                        <select required id="category">
                            <option>Select a category</option>
                            <option name="Programming">Programming</option>
                            <option name="School Subject">School Subject</option>
                            <option name="Art">Art</option>
                            <option name="Sports">Sports</option>
                            <option name="Music">Music</option>
                            <option name="Games">Games</option>
                            <option name="Other">Other</option>
                        </select>

                        <div style={{padding: 20, margin: 15, borderRadius: 5, border: "1px solid black"}}>
                            <p>Put here the cover image</p>
                            <input type="file" id="imageCover" accept="image/*" onChange={changeCoverImage} required />
                            <img src={tempCoverImage} rel='' style={{borderRadius: 5, display: "block", margin: "auto", width: 200}} />
                        </div>

                        <h3 style={{padding: 30}}>Setup Lessons</h3>
                        <div id="lessonsFormsDiv">
                            {lessons.map((l, index) => { return (<div style={{padding: 10}}><MiniForm changedLesson={changedLesson} lessonIndex={index} changedVideo={changedVideo} /></div>) })}
                        </div>
                        <button type="button" style={{borderRadius: 15, padding: 10, border: "2px solid black", margin: 20}} onClick={(e) => { setLessons([...lessons, {}]) }}>➕</button>
                        <button type="button" style={{borderRadius: 15, padding: 10, border: "2px solid black", margin: 20}} onClick={ removeLesson }>❌</button>
                        <hr />
                        <button type="submit" className='btn btn-outline-success'>Create</button>
                    </form>
                </div>
            ): (
                <div></div>
            )}
        </div>
    )
}

export default Create