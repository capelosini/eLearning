const mongoose = require('mongoose')
const express = require('express')
const bp = require('body-parser')
const cp = require('cookie-parser')
const bcrypt = require('bcrypt')
const md5 = require('md5')
const cors = require('cors')

const app = express()
app.use(bp.urlencoded({extended: true}))
app.use(cp())
app.use(cors())

const PORT = process.env.PORT || 8080

mongoose.connect("mongodb://127.0.0.1/elearning")
.then(() => { console.log("Database connected!") })

const {User, Course} = require('./models')

function tokenValidation(req, res){
    const token = req.cookies.token
    if(!token || User.find({token: token})){
        res.redirect("/login")
        return false
    }
    return true
}

app.get("/auth/:token", (req, res) => {
    User.findOne({token: req.params.token}).then(user => {
        if (!user){ res.send(JSON.stringify({error: true, data: "Invalid Token!"})) }
        else{ user.password=""; res.send(JSON.stringify({error: false, data: user})) }
    })
})


app.post("/login", (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if (!user){ res.send(JSON.stringify({error: true, data: "Password or Email Wrong!"})) }
        else{ 
            if (bcrypt.compareSync(req.body.password, user.password)){
                res.send(JSON.stringify({error: false, data: user.token}))
            } else{ 
                res.send(JSON.stringify({error: true, data: "Password or Email Wrong!"}))
            }
        }
    })
})


app.post("/register", (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if (user){ return res.send(JSON.stringify({error: true, data: "User already exists!"})) }
        var fullname=req.body.fullname
        var email=req.body.email
        var password=bcrypt.hashSync(req.body.password, 13)
        var type=req.body.role
        var token = md5(String(Math.random()*10)+String(Math.random()*10))
        var user = new User({fullname, email, password, type, boughtCoursesId: [], token, profileUrl: "/profile/1.svg"})
        user.save().then(() => {
            res.send(JSON.stringify({error: false, data: token}))
        })
    })
})






app.listen(PORT, () => { console.log("Server started on port "+PORT) })

