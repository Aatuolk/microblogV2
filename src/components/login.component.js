import React, { Component } from 'react';
import axios from 'axios';
const crypto = require('crypto');



export default class LogIn extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            // ans: 0,
            userList: []
        }

    }



    componentDidMount(){
        axios.get('http://localhost:5000/users/')
            .then(response => {
                this.setState({ userList: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
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


    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        this.state.userList.forEach(element => {
            if (element.password === HashPassword(this.state.password) && element.username === this.state.username) {
                console.log('Onnistuuu')
                window.location = '/home';
            } else {
                console.log('ei onnaa')
            }
        }); 


        console.log( user);
    }
    

    /* useriList() {
        return this.state.userList.map(currentUser => {
            if (
                currentUser.username === this.state.username &&
                currentUser.password === this.state.password
                ) { this.setState({
                    ans: 1
                }); return 'true'
            }
            else { return 'false'
            }

            
        })
    } */


    render() {
        return (
            <div>
                <h3>Login</h3>
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
                        <label>Password: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                    </div>
                    
                    <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary" />
                    </div>



                </form>
            </div>
        )
    }
}

// For unHashing
const HashPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
  }