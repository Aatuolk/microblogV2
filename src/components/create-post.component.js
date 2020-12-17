import React, { Component } from 'react';
import axios from 'axios';

const Posti = props => (
    <div>
        <h3>{props.post.username} says</h3>
        <p>{props.post.content}</p>
    </div>
)




export default class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            content: '',
            postList: []
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
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
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

        console.log(post);

        axios.post('http://localhost:5000/posts/add', post)
            .then(res => console.log(res.data));
        this.componentDidMount();

        this.setState({
            content: ''
        })

        
        // Tänne voisi laittaa koodin joka tyhjentää tekstilaatikon submitattaessa

    }

    postiList() {
        return this.state.postList.map(currentPost => {
            return <Posti post={currentPost} key={currentPost._id} />;
        })
    }


    render() {
        return (
            <div>
                <h3>Post Forum</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group"> 
                        <p> {this.postiList()}</p>
                    </div>

                    <div className="form-group"> 
                        <label>Post something: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onChangeContent}
                            />
                    </div>
                    
                    <div className="form-group">
                    <input type="submit" value="Make a post" className="btn btn-primary" />
                    </div>

                    


                </form>
            </div>
        )
    }
}