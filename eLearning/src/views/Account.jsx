import Navbar from '../components/navbar'
import { useState } from "react"
import swal from 'sweetalert'
import apiRequests from "../utils/apiRequests"
import Course from '../components/course'

function Account(){

    document.querySelector('title').innerText = "My Account"

    const [profileUrl, setProfileUrl] = useState("/profiles/1.svg")

    function changeProfile(e){
        var p = Math.floor(Math.random() * 13) + 1
        setProfileUrl("/profiles/" + p + ".svg")
    }

    async function saveProfile(e){
        var error=false
        var data=await apiRequests.post("edit/profile", {profileUrl}).catch(async(err) => {
            await swal("Error", "Something went Wrong!", "error")
            error=true
        })
        if(error) return
        var dataJson=JSON.parse(data.data)
        console.log(data.json())
        if(dataJson.error) {
            await swal("Error", "Something went Wrong!", "error")
        } else{
            swal("Success", "Profile successfully updated!", "success")
        }
    }
    

    return(
        <div>
            <Navbar />
            <div className="row" style={{padding: 40}}>
                <div className="col" style={{textAlign: "right", padding: 50}}>
                    <h1>Account Details</h1>
                    <div style={{padding: 20}}>
                        <p>Name: TESTE de TESTE</p>
                        <p>Email: TESTE@gmail.com</p>
                        <p>XP: 2</p>
                    </div>
                </div>
                <div className="col" style={{textAlign: "center", border: "2px solid black", borderRadius: 5, padding: 15}}>
                    <p>Update picture</p>
                    <img style={{width: 250}} src={profileUrl} id="profilePic" onClick={changeProfile}/>
                    <button style={{margin: 30}} className="btn btn-outline-success" onClick={saveProfile}>Save!</button>
                </div>
            </div>
            <hr />
            <div className="row" style={{textAlign: "center"}}>
                <h1 style={{padding: 20}}>My courses</h1>
                <div className='col'>
                    <Course title="C The Best Programming Lang" rating="5" price="R$52,00" url={"/watch/"+1} img="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wixeq.com%2Fwp-content%2Fuploads%2F2017%2F12%2Fsem-imagem.jpg&f=1&nofb=1&ipt=9f5c2e525c640d0ca95c9b0b0fd8ad8e16aece0defeee2f64b965ef774b79b48&ipo=images" />
                </div>
            </div>
        </div>
    )
}

export default Account