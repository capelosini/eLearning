import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logoLight from '../assets/logo-light.svg';
import auth from "../utils/auth"

function navbar(){

    const [user, setUser] = useState(null)

    useEffect(() => {
        auth().then(res => {
            if(res){ setUser(res) }
        })
    }, [])

    return(
        <nav data-bs-theme="dark" className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <Link to="/"><img className="navbar-brand" src={logoLight}/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {user ? (
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item ms-auto"><Link to="/home" className="nav-link">Home</Link></li>
                            <li className="nav-item ms-auto"><Link to="/account" className="nav-link"><img width="40px" src={user.profileUrl}/></Link></li>
                        </ul>
                    </div>
                ): (<div></div>)}
            </div>
        </nav>
    )
}

export default navbar