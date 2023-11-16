const mongoose = require("mongoose")

// users Table
const userSchema = new mongoose.Schema({
    fullname: String,
    type: String,
    boughtCoursesId: [{ type: String }],
    email: String,
    password: String,
    token: String,
    profileUrl: String,
    userId: String
})
const User = mongoose.model("User", userSchema)

// courses Table
const lessonSchema = new mongoose.Schema({
    title: String,
    description: String,
    video: String,
    duration: Number
})
const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    courseId: String,
    price: Number,
    image: String,
    instructorId: String,
    duration: Number,
    category: String,
    rating: Number,
    studentsTotal: Number,
    lessons: [lessonSchema]
})
const Course = mongoose.model("Course", courseSchema)

module.exports = { User, Course }