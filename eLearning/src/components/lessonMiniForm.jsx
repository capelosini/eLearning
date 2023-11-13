function lessonMiniForm(props){
    return(
        <div>
            <h5>Lesson {props.lessonIndex+1}</h5>
            <input className="formInput" type="text" placeholder="Lesson Title" />
            <textarea placeholder="Lesson Description" ></textarea>
            <p style={{padding: "20px 0 0 0"}}>Video File</p>
            <input type="file" accept="video/*" />
            <hr />
        </div>
    )
}


export default lessonMiniForm