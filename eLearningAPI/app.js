const mongoose = require('mongoose')
const express = require('express')
const bp = require('body-parser')
const cp = require('cookie-parser')
const bcrypt = require('bcrypt')
const md5 = require('md5')
const sha256 = require('sha256')
const cors = require('cors')
const fs = require('fs')
const multer = require('multer')

const app = express()
app.use(bp.urlencoded({extended: true}))
app.use(cp())
app.use(cors())

const PORT = process.env.PORT || 8080
const videosPath = __dirname+"/lessons"
const upload = multer({storage: multer.memoryStorage()})

mongoose.connect("mongodb://127.0.0.1/elearning")
.then(() => { console.log("Database connected!") })

const {User, Course} = require('./models')


if (!fs.existsSync(videosPath)){
    fs.mkdirSync(videosPath)
}

function createId(bigger=false){
    if(bigger){
        return sha256(String(Math.random()*10)+String(Math.random()*10)+String(Math.random()*10)+String(Math.random()*10))
    } else{
        return md5(String(Math.random()*10)+String(Math.random()*10)+String(Math.random()*10)+String(Math.random()*10))
    }
}

function tokenValidation(req, res){
    const token = req.body.token
    var user=User.find({token: token})
    if(!token || !user){
        res.send(JSON.stringify({error: true, data: "Invalid Token!"}))
        return false
    }
    return user
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
        var token = createId(true)
        var userId = createId()
        var user = new User({fullname, email, password, type, boughtCoursesId: [], token, profileUrl: "/profiles/1.svg", userId})
        user.save().then(() => {
            res.send(JSON.stringify({error: false, data: token}))
        })
    })
})

app.post("/edit/profile", (req, res) => {
    if (tokenValidation(req, res)){
        if (req.body.profileUrl && String(req.body.profileUrl).startsWith("/profiles/") && String(req.body.profileUrl).endsWith(".svg")){
            User.findOneAndUpdate({token: req.body.token}, {profileUrl: req.body.profileUrl}, {new: true}).then(r => {
                res.send(JSON.stringify({error: false, data: "Profile Updated!"}))
                return
            })
        } else{
            res.send(JSON.stringify({error: true, data: "Invalid Profile URL!"}))
            return
        }
    }
})

app.post("/get/courses", (req, res) => {
    if (tokenValidation(req, res)){
        Course.find().then(courses => {
            res.send(JSON.stringify({error: false, data: courses}))
        })
    }
})

app.post("/get/course/:courseId", (req, res) => {
    if (tokenValidation(req, res)){
        Course.findOne({courseId: req.params.courseId}).then(course => {
            if (course){
                res.send(JSON.stringify({error: false, data: course}))
            } else{
                res.send(JSON.stringify({error: true, data: "Course not found!"}))
            }
        })
    }
})

app.post("/checkout", (req, res) => {
    tokenValidation(req, res).then(user => {
        if (user){
            user=user[0]
            if (user.boughtCoursesId.includes(req.body.courseId)){
                res.send(JSON.stringify({error: true, data: "You already bought this course!"}))
                return
            }
            user.boughtCoursesId.push(req.body.courseId)
            User.findOneAndUpdate({token: req.body.token}, {boughtCoursesId: user.boughtCoursesId}, {new: true}).then(r => {
                Course.findOneAndUpdate({courseId: req.body.courseId}, {$inc: {studentsTotal: 1}}).then(course => {
                    res.send(JSON.stringify({error: false, data: "Checkout Successful!"}))
                })
            })
        }
    })
})

app.get("/video/:courseId/:videoName/:token", (req, res) => {
    User.find({token: req.params.token}).then(user => {
        if (user.length>0 && fs.existsSync(videosPath+"/"+req.params.videoName)){
            if (user[0].boughtCoursesId.includes(req.params.courseId)){
                const buffer = fs.readFileSync(videosPath+"/"+req.params.videoName)
                res.setHeader('Content-Type', 'video/mp4')
                res.send(buffer)
            } else{
                res.send(JSON.stringify({error: true, data: "You don't have access to this!"}))
            }
        }else{
            res.send(JSON.stringify({error: true, data: "You don't have access to this!"}))
        }
    })
})

app.post("/create/course", upload.any(), (req, res) => {
    tokenValidation(req, res).then(user => {
        if (!user){ return }
        if (user[0].type == "teacher"){
            var courseInfo=JSON.parse(req.body.course)
            var lessonsInfo=JSON.parse(req.body.lessons)
            var courseTemp = {title: courseInfo.title, description: courseInfo.description, courseId: createId(), rating: 0, studentsTotal: 0, lessons: [], price: Number(courseInfo.price), image: courseInfo.coverImage, category: courseInfo.category, instructorId: user[0].userId}
            var lessonsTemp=[]
            lessonsInfo.forEach((lesson, index) => {
                if (!req.files[index].mimetype == "video/mp4"){ return res.send(JSON.stringify({error: true, data: "We only accept 'mp4' files!"})) }
                var filename=createId()+".mp4"
                fs.writeFileSync(videosPath+"/"+filename, req.files[index].buffer)
                lessonsTemp.push({title: lesson.title, description: lesson.description, video: filename, duration: req.files[index].size})
                courseTemp.duration=req.files[index].size
                if (index == lessonsInfo.length-1){
                    courseTemp.lessons=lessonsTemp
                    var course = new Course(courseTemp)
                    course.save().then(() => {
                        res.send(JSON.stringify({error: false, data: "Course created successfully!"}))
                    })
                }
            })
        }  else if (user[0].type == "student"){
            res.send(JSON.stringify({error: true, data: "You don't have access to this!"}))
        }
    })
})






app.listen(PORT, () => { console.log("Server started on port "+PORT) })

