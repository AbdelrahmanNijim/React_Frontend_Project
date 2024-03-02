import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import styles from './Navbar.module.css';
function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>E-Commerce-test</Link>
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
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/categories' >Categories</NavLink>
                            </li>
                            



                        </ul>
                        <div className={styles.navend} >

                            <div className={styles.Auth}>

                                <NavLink className="nav-link" to='/login' >Login</NavLink>
                                <NavLink className="nav-link" to='/signup' >Sign Up</NavLink>

                            </div>
                            <div className={styles.cart}>
                                <NavLink className='nav-link ' to='/cart' > <FontAwesomeIcon icon={faCartShopping} />  </NavLink>
                            </div>

                        </div>



                    </div>

                </div>
            </nav>

        </>

    )
}

export default Navbar