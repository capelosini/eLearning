import Navbar from '../components/navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/footer'

function Index(){
    
    document.querySelector('title').innerText = "Welcome to EL!"

    return (
        <div>
            <Navbar />

            <section className='indexHeadSection'>
                <h1>Start Learning Now!</h1>
                <Link to="/login" className='getStartedBtn'>Get started</Link>
            </section>

            <section className='indexCoursesSection'>
                <h2>What they say about us</h2>
                <hr />
                <div className='row align-items-start'>
                    <div className='col indexCourseExample'>
                        <h3>Pedro</h3>
                        <img src="/profiles/3.svg" />
                        <p><strong>Now i can learn much faster, thanks EL!</strong></p>
                    </div>
                    <div className='col indexCourseExample'>
                        <h3>João</h3>
                        <img src="/profiles/13.svg" />
                        <p><strong>Good courses with great quality ⭐⭐⭐⭐⭐</strong></p>
                    </div>
                    <div className='col indexCourseExample'>
                        <h3>Camila</h3>
                        <img src="/profiles/12.svg" />
                        <p><strong>Easy, great quality and cheap. My choice when I want to learn something</strong></p>
                    </div>
                </div>
                <hr />
            </section>
            
            <Footer />
        </div>
    )
}

export default Index;