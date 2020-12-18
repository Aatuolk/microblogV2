import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';
import PostForum from './components/post-forum.component';
import CreatePost from './components/create-post.component';
import CreateUser from './components/create-user.component';



function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={PostForum} />
      <Route path="/users" component={CreateUser} />
      <Route path="/create" component={CreatePost} /> 
      </div>
    </Router>
  );
}

export default App;
