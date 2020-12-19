const router = require('express').Router();
let Post = require('../models/post.model');


// Handles http get requests on the /posts/ path
// return posts in json format from the DB
router.route('/').get((req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Handles http post requests on the /posts/add path
// adds new posts to the database
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const content = req.body.content;

  const newPost = new Post({
    username,
    content
  });

  newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// These are for getting and deleting posts by id
// not currently in use, but good for future development

/* router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err => res.status(400).json('Error: ' + err));
});
  
router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .then(() => res.json('Post deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
}); 
 */

// exporting the router
module.exports = router;