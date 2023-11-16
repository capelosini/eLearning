import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { StrictMode } from 'react'
import Navbar from "../components/navbar"
import Course from "../components/course"
import swal from 'sweetalert';
import apiRequests from '../utils/apiRequests'
import auth from '../utils/auth'


function Checkout(){
    
    const {courseId} = useParams();

    document.querySelector('title').innerText = "Checkout"
    
    const [user, setUser] = useState(null)
    const [course, setCourse] = useState(null)

    useEffect(() => {
        auth().then((res) => {
            if(!res){ window.location.href="/login" }
            else{ 
                setUser(res) 
                apiRequests.post("get/course/"+courseId, {token: res.token}).then((res) => { if (!res.error){ setCourse(Object(res.data))} else{ window.location.href="/course/"+courseId } })
            }
        })
    }, [])
    
    async function handleSubmit(e){
        e.preventDefault()
        var cardOwner = document.getElementById("cardOwner").value
        var cardNumber = document.getElementById("cardNumber").value
        var cardCVV = document.getElementById("cardCVV").value
        var cpf = document.getElementById("cpf").value
        
        var error=false
        var data=await apiRequests.post("checkout", {cardOwner, cardNumber, cardCVV, cpf, courseId, token: user.token}).catch(async(err) => {
            await swal("Error", "Course purchase failed, try again later!", "error")
            error=true
        })
        if(error) return

        if(data.error) {
            await swal("Error", data.data, "error")
            return
        } else{
            await swal("Success", "Course purchased successfully!", "success")
            window.location.href="/account"
        }
    }


    return (
        <div>
            {user ? (
                <div>
                    <Navbar />
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="courseId" value={courseId} />
                        <span className="formTitle">Checkout ✅</span>
                        <div className="row">
                            {course && !user.boughtCoursesId.includes(courseId) ? (
                                <StrictMode>
                                    <div className="col">
                                        <Course title={course.title} rating={course.rating} price={"R$"+course.price} url={"/course/"+courseId} img={course.image} />
                                    </div>
                                    <div className="col">
                                        <h3 style={{padding: 20}}>Payment Info</h3>
                                        <label className="formLabel">Card Owner</label>
                                        <input className="formInput" type="text" id="cardOwner" />
                                        <label className="formLabel">Card Number</label>
                                        <input className="formInput" type="text" id="cardNumber" />
                                        <label className="formLabel">CVV</label>
                                        <input className="formInput" type="text" id="cardCVV" />
                                        <label className="formLabel">CPF</label>
                                        <input className="formInput" type="text" id="cpf" />
                                        <div className="row">
                                            <div className="col">
                                                <button type="submit" className="btn btn-lg btn-outline-success">Buy</button>
                                            </div>
                                        </div>
                                    </div>
                                </StrictMode>
                            ): (
                                <div className="col">
                                    <h3>This course is already in your account!</h3>
                                    <Link to="/account" className="btn btn-outline-dark">Go to account</Link>
                                </div>
                            )}
                        </div>

                    </form>
                </div>
            ): (<div></div>)}
            </div>
    )
}


export default Checkout