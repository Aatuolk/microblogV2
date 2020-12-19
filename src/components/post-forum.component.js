import React, { Component } from 'react';


// This is "frontpage"
// React class component
export default class PostForum extends Component {
    render() {
        return (
            <div>
                <div className='jumbotron'> 
                <h1>This is a microblogging service!</h1>
                <strong>You are able to write your own posts or read other peoples posts at the post forum.</strong>
                </div>
            </div>
        )
    }
}