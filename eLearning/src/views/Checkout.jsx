import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "../components/navbar"
import Course from "../components/course"
import swal from 'sweetalert';
import apiRequests from '../utils/apiRequests'
import auth from '../utils/auth'


function Checkout(){
    
    const {courseId} = useParams();

    document.querySelector('title').innerText = "Checkout"
    
    const [user, setUser] = useState(null)

    useEffect(() => {
        auth().then((res) => {
            if(!res){ window.location.href="/login" }
            else{ setUser(res) }
        })
    }, [])
    
    async function handleSubmit(e){
        e.preventDefault()
        var cardOwner = document.getElementById("cardOwner").value
        var cardNumber = document.getElementById("cardNumber").value
        var cardCVV = document.getElementById("cardCVV").value
        var cpf = document.getElementById("cpf").value
        
        var error=false
        await apiRequests.post("checkout", {cardOwner, cardNumber, cardCVV, cpf}).catch(async(err) => {
            await swal("Error", "Course purchase failed!", "error")
            error=true
        })
        if(error) return
        await swal("Success", "Course purchased successfully!", "success")
        window.location.href="/home"
        return
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
                            <div className="col">
                                <Course title="C The Best Programming Lang" rating="5" price="R$52,00" url={"/course/"+courseId} img="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wixeq.com%2Fwp-content%2Fuploads%2F2017%2F12%2Fsem-imagem.jpg&f=1&nofb=1&ipt=9f5c2e525c640d0ca95c9b0b0fd8ad8e16aece0defeee2f64b965ef774b79b48&ipo=images" />
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
                        </div>

                    </form>
                </div>
            ): (<div></div>)}
            </div>
    )
}


export default Checkout