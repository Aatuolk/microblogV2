import React, { Component } from 'react';

import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeconfPassword = this.onChangeconfPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            confpassword: ''
        };

    }
    
    

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeconfPassword(e) {
        this.setState({
            confpassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.password === this.state.confpassword) {

            const user = {
                username: this.state.username,
                password: this.state.password
            }

            console.log(user);

            axios.post('http://localhost:5000/users/add', user)
                .then(res => console.log(res.data));


            window.location = '/';
        } else {
            alert('Passwords do not match try again!')
        }
    }



    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>

                    <div className="form-group"> 
                        <label>Password </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                    </div>

                    <div className="form-group"> 
                        <label>Confirm Password </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.confpassword}
                            onChange={this.onChangeconfPassword}
                            />
                    </div>
                    
                    <div className="form-group">
                    <input type="submit" value="Create New User" className="btn btn-primary" />
                    </div>

                    


                </form>
            </div>
        )
    }
}


