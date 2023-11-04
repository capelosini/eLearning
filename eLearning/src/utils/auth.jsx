import apiRequests from "./apiRequests"

async function auth(){
    var token=localStorage.getItem("token")
    if (token){
        var data=await apiRequests.get("auth/"+token)
        if(data.error){
            localStorage.removeItem("token")
            return false
        } else{
            return data.data
        }
    } else{
        return false
    }
}

export default auth