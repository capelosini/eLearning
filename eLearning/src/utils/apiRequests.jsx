import axios from 'axios'

const HOST = "http://localhost:8080"

async function get(url) {
    const response = await axios.get(HOST + "/" + url)
    return response.data
}

async function post(url, data) {
    const response = await axios.post(HOST + "/" + url, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded', "Access-Control-Allow-Origin": "*", "Accept": "*"}})
    return response.data
}

export default { get, post }