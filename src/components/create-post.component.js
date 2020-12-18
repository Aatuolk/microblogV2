import React, { Component } from 'react';
import axios from 'axios';
const crypto = require('crypto');

// cretaedAt voisi laittaa kuntoon
const Posti = props => (
    <div>
        <strong>{props.post.username} says:</strong>
        <p>{props.post.content}   ({props.post.createdAt})</p>   
    </div>
)




export default class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            content: '',
            postList: [],
            userList: [],
            usernames: []
        }

    }

    componentDidMount(){
        axios.get('http://localhost:5000/posts/')
            .then(response => {
                this.setState({ postList: response.data })
                this.postiList()
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                this.setState({ 
                    userList: response.data,
                    usernames: response.data.map(user => user.username)
                    // username: response.data [0].username 
                })
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

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const post = {
            username: this.state.username,
            content: this.state.content
        }

        this.state.userList.forEach(element => {
            if (element.password === HashPassword(this.state.password) && element.username === this.state.username) {


                axios.post('http://localhost:5000/posts/add', post)
                .then(res => console.log(res.data));

                
                this.componentDidMount();
                
                
            }
        }); 

        this.postiList()
        this.setState({
            content: ''
        })

    }

    postiList() {
        return this.state.postList.map(currentPost => {
            return <Posti post={currentPost} key={currentPost._id} />;
        })
    }


    render() {
        return (
                <div>
                <h4>Here you can create posts by inserting your Username and Password and then you can submit a post</h4>
                <div className="jumbotron">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <p> {this.postiList()}</p>
                        </div>


                        <div className="form-group">
                            <label>
                                <strong>Username:</strong> 
                            </label>
                            <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Password:</strong> 
                            </label>
                            <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Content:</strong> 
                            </label>
                            <textarea type="text"
                            rows="3"
                            maxLength='300'
                            required
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onChangeContent}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Submit Post" className="btn btn-dark" />
                        </div>
                    </form>
                </div>
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