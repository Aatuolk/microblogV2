import React, { Component } from 'react';
import axios from 'axios';


// Options for date foramtting
const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

// Functional React component for single posts which appear to the post forum
const Posti = props => (
    <div>
        <strong>{props.post.username} says:</strong>
        <p>{props.post.content}</p>
        <p>({(new Date(props.post.createdAt)).toLocaleDateString(undefined, DATE_OPTIONS)})</p>
    </div>
)



// React class component
export default class PostPage extends Component {
    // Constructor for react component
    constructor(props) {
        super(props);

        // Binding "this" for each method so "this" will refer to the class
        this.onChangeUsername = this.onChangeUsername.bind(this);


        //Initial state
        this.state = {
            username: '',
            postList: []
        };
    }


   // Sets state when username is changed
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // React lifecycle method which is called right before anything is displayed on the page
    // Send http get request tot he backend and gets all posts from the database and puts them to the postList
    componentDidMount() {
        axios.get('http://localhost:5000/posts/')
            .then(response => {
                this.setState({ postList: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    // Maps certain elements from the array if the given username matches with the username from the list
    postiLista() {
        return this.state.postList.map(currentPost => {
            if (currentPost.username === this.state.username) {
                return <Posti post={currentPost} key={currentPost._id} />;
            }
        })

    }

    // Handles the submit event
    onSubmit(e) {
        e.preventDefault(); // prevents default html submit behaviour

        // Sends http post request to the backend to get all posts
        axios.post('http://localhost:5000/posts/')
            .then(response => {
                this.setState({ postList: response.data })
            })
            .catch((error) => {
                console.log(error);
            })


    }

    // What renders to the page is shown here
    render() {
        return (
            <div>
                <h4>Here you can search posts from individual users.</h4>

                <div className="jumbotron">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>
                                <strong>Username: </strong>
                            </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="form-group">
                            <p> {this.postiLista()}</p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}