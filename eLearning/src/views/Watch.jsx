import { useParams } from "react-router-dom"

function Watch(){
    
    const { courseId } = useParams()
    
    return(
        <div>
            <h1>Watch {courseId}</h1>
        </div>
    )
}

export default Watch