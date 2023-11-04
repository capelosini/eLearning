import logoLight from '../assets/logo-light.svg';
import { Link } from 'react-router-dom';

function navbar(){
    return(
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <Link to="/"><img className="navbar-brand" src={logoLight}/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to="/account" className="nav-link">Account</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default navbar