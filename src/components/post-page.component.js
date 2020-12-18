import React, { Component } from 'react';
import axios from 'axios';


const Posti = props => (
    <div>
        <strong>{props.post.username} says:</strong>
        <p>{props.post.content}   ({props.post.createdAt})</p>
    </div>
)




export default class PostPage extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: '',
            postList: []
        }
    }



    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    componentDidMount() {
        this.setState({
            username: 'Username'
        })
    }



    postiLista() {
        return this.state.postList.map(currentPost => {
            return <Posti post={currentPost} key={currentPost._id} />;
        })
    }


    onSubmit(e) {
        e.preventDefault();


        //input from user
        const user = {
            username: this.state.username
        }

        //Get posts from defined username
        axios.post('http://localhost:5000/posts/find', user)
            .then(response => {
                this.setState({ postList: response.data })
            })
            .catch((error) => {
                console.log(error);
            })


    }

    render() {
        return (
            <div>

                <div className="jumbotron">
                    <form onSubmit={this.onSubmit}>
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
                            <input type="submit" value="Find Users Posts" className="btn btn-dark" />
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