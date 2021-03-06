import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";  /* For easier routing*/ 
import 'bootstrap/dist/css/bootstrap.min.css'; /* Using bootstrap for more functional UI*/

// importing required react components
import Navbar from './components/navbar.component';
import PostForum from './components/post-forum.component';
import CreatePost from './components/create-post.component';
import CreateUser from './components/create-user.component';
import PostPage from './components/post-page.component';


// this gets rendered in index.js
// Route element for each required React component
function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={PostForum} />    
      <Route path="/users" component={CreateUser} />
      <Route path="/create" component={CreatePost} />
      <Route path="/posts" component={PostPage} /> 
      </div>
    </Router>
  );
}

export default App;
