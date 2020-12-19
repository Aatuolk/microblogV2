import React, { Component } from 'react';

import axios from 'axios';

// React class component
export default class CreateUser extends Component {
    // Constructor for react component
    constructor(props) {
        super(props);

        // Binding "this" for each method so "this" will refer to the class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeconfPassword = this.onChangeconfPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //Initial state
        this.state = {
            username: '',
            password: '',
            confpassword: ''
        };

    }


    // Sets state when username is changed
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // Sets state when password is changed
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    // Sets state when confirmation password is changed
    onChangeconfPassword(e) {
        this.setState({
            confpassword: e.target.value
        });
    }

     // Handles the submit event (when submit button is clicked)
    onSubmit(e) {
        e.preventDefault(); // prevents default html submit behaviour

        // Checks if password and confirm passwords match
        if (this.state.password === this.state.confpassword) {

            // users input
            const user = {
                username: this.state.username,
                password: this.state.password
            }

            console.log(user);

            // Sends http post request to the backend (Adds new user to the DB)
            axios.post('http://localhost:5000/users/add', user)
                .then(res => console.log(res.data));


            window.location = '/'; // Changes window to the "Frontpage" (Post-forum component)
        } else {
            alert('Passwords do not match try again!')
        }
    }


    // What renders to the page is shown here
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <div className="jumbotron">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                required
                                minLength= '3'
                                maxLength= '20'
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password </label>
                            <input type="text"
                                required
                                minLength= '6'
                                maxLength= '14'
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password </label>
                            <input type="text"
                                required
                                minLength= '6'
                                maxLength= '14'
                                className="form-control"
                                value={this.state.confpassword}
                                onChange={this.onChangeconfPassword}
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Create New User" className="btn btn-dark" />
                        </div>




                    </form>
                </div>
            </div>
        )
    }
}


