import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

function CourseOverview(){

    const { courseId } = useParams()

    return(
        <div>
            <Navbar />
            <section className="section courseOverviewSection">
                <div className="row">
                    <div className="col-md-3">
                        <img alt="Course img"/>
                    </div>
                    <div className="col-md-8">
                        <h1>Course Title ID: {courseId}</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                        <p>Duration: 50h</p>
                        <p>Price: $100</p>
                        <Link to={"/checkout/"+courseId}><button className="getStartedBtn">Buy now!</button></Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CourseOverview