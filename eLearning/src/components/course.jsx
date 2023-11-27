import { Link } from 'react-router-dom'

function Course(props){
    return(
        <Link to={props.url} style={{textDecoration: "none"}} className="col">
            <div className='course'>
                <span className='courseTitle'>{props.title}</span>
                <img className='courseImage' src={props.img} />
                <span className='courseRating'>⭐ {props.rating}</span>
                <span className='coursePrice'>{props.price}</span>
            </div>
        </Link>
    )
}


export default Course