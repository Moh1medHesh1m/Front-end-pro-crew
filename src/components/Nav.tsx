import React from 'react';
import {Link} from "react-router-dom";

const Nav = (props: { name: string, setName: (name: string) => void }) => {
    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        console.log(props.name)

        props.setName('');
    }

    let menu;

    if (props.name === '') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    
                    <Link to="/" className="nav-link" onClick={logout}>Logout</Link>

                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar  navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
                <Link to="/" className="navbar-brand">{props.name}</Link>
                <Link to="/cart" className="navbar-brand" style={{marginLeft:"50%"}}>cart</Link>
                <Link to="/order-history " style={{marginLeft:"10%"}} className="navbar-brand">order-history</Link>
                <div>
                    {menu}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
