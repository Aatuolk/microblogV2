import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export default class FrontPage extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to microblogging service!</h1>
                <p>
                    <Link to={"/signin/"}>Sign In</Link> | <Link to={"/login/"}>Log In</Link>
                    </p>
            </div>
        )
    }
}