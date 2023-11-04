import Navbar from '../components/navbar'
import Course from '../components/course'

function Home(){

    document.querySelector('title').innerText = "Home"

    return(
        <div>
            <Navbar />
            <div className='searchBarDiv'>
                <input type='text' className='searchBar' placeholder='Search' />
            </div>
            <section className='section homeHeadSection'>
                <h1>Welcome back, $NAME!</h1>
                <h3>📚</h3>
            </section>
            <section className='section indexCoursesSection'>
                <hr />
                <h2>Courses Library</h2>
                <div className='coursesViewDiv row'>
                    <Course title="Full JS Course" rating="4" price="R$29,00" url="/course/1" img="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wixeq.com%2Fwp-content%2Fuploads%2F2017%2F12%2Fsem-imagem.jpg&f=1&nofb=1&ipt=9f5c2e525c640d0ca95c9b0b0fd8ad8e16aece0defeee2f64b965ef774b79b48&ipo=images" />
                    <Course title="C The Best Programming Lang" rating="5" price="R$52,00" url="/course/2" img="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wixeq.com%2Fwp-content%2Fuploads%2F2017%2F12%2Fsem-imagem.jpg&f=1&nofb=1&ipt=9f5c2e525c640d0ca95c9b0b0fd8ad8e16aece0defeee2f64b965ef774b79b48&ipo=images" />
                    <Course title="Java The Worst" rating="2.5" price="R$10,50" url="/course/3" img="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wixeq.com%2Fwp-content%2Fuploads%2F2017%2F12%2Fsem-imagem.jpg&f=1&nofb=1&ipt=9f5c2e525c640d0ca95c9b0b0fd8ad8e16aece0defeee2f64b965ef774b79b48&ipo=images" />
                </div>
            </section>
        </div>
    )
}




export default Home