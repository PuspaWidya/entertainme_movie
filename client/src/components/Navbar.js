import React from 'react'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
export default function Navbar() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a class="navbar-brand">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <Link to="/"> 
                    <a class="nav-link">HOME</a>
                    </Link>
                </li>
                <li class="nav-item">
                 <Link to="/movie"> 
                    <a class="nav-link">Movie</a>
                    </Link>
                </li>
                <li class="nav-item">
                 <Link to="/favorite"> 
                    <a class="nav-link">Favorite</a>
                    </Link>
                </li>
                <li class="nav-item">
                 <Link to="/"> 
                    <a class="nav-link">HOME</a>
                    </Link>
                </li>
                </ul>
            </div>
            </nav>
        </>
    )
}
