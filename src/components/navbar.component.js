import React, { Component } from 'react';
import { Link } from 'react-router-dom';  /* for linking to different routes */



//Navbar component similar to one from bootstrap doc
export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand mb-0 h1">Micro Blog</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Post forum</Link>
          </li>
          <li className="navbar-item">
          <Link to="/users" className="nav-link">Create New User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/posts" className="nav-link">Posts</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}