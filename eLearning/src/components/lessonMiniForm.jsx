function lessonMiniForm(props){
    return(
        <div>
            <h5>Lesson {props.lessonIndex+1}</h5>
            <input className="formInput" type="text" name="title" placeholder="Lesson Title" onChange={(e) => {props.changedLesson(e, props.lessonIndex)}} />
            <textarea placeholder="Lesson Description" name="description" onChange={(e) => {props.changedLesson(e, props.lessonIndex)}} ></textarea>
            <p style={{padding: "20px 0 0 0"}}>Video File</p>
            <input type="file" accept="video/*" onChange={(e) => {props.changedVideo(e, props.lessonIndex)}}/>
            <hr />
        </div>
    )
}


export default lessonMiniForm