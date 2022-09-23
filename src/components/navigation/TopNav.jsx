// React, Router & Redux imports
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { searchTerm } from '../../utils/searchReducer';

// Overige imports
import { SignOut } from '../../utils/firebase';
import { getAuth } from 'firebase/auth';

// Import images functie
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/));

export default function TopNav() {
    const [openLogin, setOpenLogin] = useState(false)
    const dispatch = useDispatch()

    const toggleLogin = () => {
        setOpenLogin(!openLogin);
    };

    const handleSignOut = () => {
        SignOut()
        toggleLogin()
    }

    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <>
            <nav className="top-nav">
                <Link to="/">
                    <img alt="HappyPaws logo" src={images["logo-3.png"]} />
                </Link>
                <div className="searchbar">
                    <input className="input" onChange={(e) => dispatch(searchTerm({ text: e.target.value }))} /><Link className="search-link" to='/zoekresultaten'><button>Zoek</button></Link>
                </div>
                <div className="login-cart">
                    <img alt="login" onClick={toggleLogin} className="login" src={images["user-login.svg"]} />
                    {openLogin ? (
                        <div className="loginpopup">
                            <p className="close" onClick={toggleLogin}>X</p>
                            {user ? (
                                <>
                                    <p>Ingelogd als {user.displayName ? user.displayName : user.email}</p>
                                    <button onClick={handleSignOut}>Uitloggen</button>
                                </>
                            )
                                : <Link to="/login"><button onClick={toggleLogin}>Inloggen</button></Link>
                            }
                        </div>
                    ) : null}
                    <Link to="/winkelwagen">
                        <img alt="winkelwagen" className="cart" src={images["shopping-cart.svg"]} />
                    </Link>
                </div>
            </nav>
        </>
    )
}