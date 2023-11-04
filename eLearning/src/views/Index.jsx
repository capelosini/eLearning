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
                <h2>Trending Courses</h2>
                <hr />
                <div className='row align-items-start'>
                    <div className='col indexCourseExample'>
                        <h3>Web Development</h3>
                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.achieversit.com%2Fuploads%2Fcourse_image%2Fweb-dev-img.jpeg&f=1&nofb=1&ipt=859966a345a2a136c930282176b7fb8cfcb3a049fb5211d555f272c778011ba7&ipo=images" />
                        <p>Learn how to build websites with HTML, CSS, and JavaScript.</p>
                    </div>
                    <div className='col indexCourseExample'>
                        <h3>C Programming Language</h3>
                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fblog%2Fpost%2Fseo%2Fog_image_file%2Fog_image%2F13649%2F0828_AfterAllTheseYearstheWorldisStillPoweredbyCProgramming_Razvan_Social-d385a3cca01699556490f88baa50d00a.png&f=1&nofb=1&ipt=c7ecd718f5bd08736d1245dd976e4233d3713a11af9d37234ce1a1bde1192112&ipo=images" />
                        <p>Learn how to use C to solve various problems.</p>
                    </div>
                    <div className='col indexCourseExample'>
                        <h3>Python</h3>
                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsistemasgeniales.com%2Fwp-content%2Fuploads%2F2020%2F10%2FPYTHONLANG3.jpg&f=1&nofb=1&ipt=1780bfdf5b7e4ed1a64fe62fbbaf0699a3ca76351dbaa134820f7bf562286de6&ipo=images" />
                        <p>Learn how to use Python in some cenarious.</p>
                    </div>
                </div>
                <hr />
            </section>
            
            <Footer />
        </div>
    )
}

export default Index;