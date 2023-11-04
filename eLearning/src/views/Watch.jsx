import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import auth from "../utils/auth"


function Watch(){
    
    document.querySelector('title').innerText = "Learning 🔎"
    
    const [user, setUser] = useState(null)
    const { courseId } = useParams()

    useEffect(() => {
        auth().then((res) => {
            if(!res){ window.location.href="/login" }
            else{ setUser(res) }
        })
    })
    
    return(
        <div>
            {user ? (
                <div>
                    <h1>Watch {courseId}</h1>
                </div>
            ): (<div></div>)}
        </div>
    )
}

export default Watch