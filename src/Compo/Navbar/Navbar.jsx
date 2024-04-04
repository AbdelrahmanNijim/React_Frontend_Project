import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
    }, []);

    const clearToken = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>E-Commerce</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to='/' >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/products' >Products</NavLink>
                            </li>
                        </ul>
                        <div className={styles.navend}>
                            <div className={styles.Auth}>
                                {isLoggedIn ? (
                                    <>
                                        <NavLink className="btn btn-outline-danger" to='/' onClick={clearToken}>Logout</NavLink>
                                        <NavLink className="btn btn-outline-primary" to='/profile'> Profile </NavLink>
                                    </>

                                ) : (
                                    // Render login and signup buttons if user is not logged in
                                    <>
                                        <NavLink className="btn btn-outline-primary" to='/login'>Login</NavLink>
                                        <NavLink className="btn btn-outline-secondary" to='/signup'>Sign Up</NavLink>
                                    </>
                                )}
                            </div>
                            <div className={styles.cart}>
                                <NavLink className='nav-link' to='/cart'><FontAwesomeIcon icon={faCartShopping} /></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;