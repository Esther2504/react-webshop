// React, Router & Redux imports
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { searchTerm } from '../../utils/searchReducer';

export default function BottomNav() {
    const [hamburger, setHamburger] = useState(false);
    const [isDesktop, setDesktop] = useState(window.innerWidth > 750)
    const dispatch = useDispatch()

    // Om het hamburger menu te laten zien op basis van schermgrootte
    const updateMedia = () => {
        setDesktop(window.innerWidth > 750);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, []);

    return (
        <>
            {isDesktop ? (
                <ul className="bottom-nav-desktop">
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/manden"><li>Manden</li></Link>
                    <Link to="/speelgoed"><li>Speelgoed</li></Link>
                    <Link to="/halsbanden"><li>Halsbanden</li></Link>
                </ul>
            ) : (
                <div>
                    <div className="searchbar-mobile">
                        <input className="input" onChange={(e) => dispatch(searchTerm({ text: e.target.value }))} /><Link className="search-link" to='/zoekresultaten'><button>Zoek</button></Link>
                    </div>
                    <button onClick={() => setHamburger(!hamburger)} className="hamburger">
                        {!hamburger ? <i className='hamburger-menu'></i> : (
                            <>
                                <i className='hamburger-menu-close'></i>
                                <ul className="bottom-nav-mobile">
                                    <hr></hr>
                                    <Link to="/"><li>Home</li></Link>
                                    <hr></hr>
                                    <Link to="/manden"><li>Manden</li></Link>
                                    <hr></hr>
                                    <Link to="/speelgoed"><li>Speelgoed</li></Link>
                                    <hr></hr>
                                    <Link to="/halsbanden"><li>Halsbanden</li></Link>
                                    <hr></hr>
                                </ul>
                            </>
                        )
                        }
                    </button>
                </div>
            )}
        </>
    )
}
