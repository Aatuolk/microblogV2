const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); /* for easier connection to MongoDB*/

// dotenv for environment variables  (.env file)
require('dotenv').config();

// For creating express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware 
app.use(cors());
app.use(express.json());  /* For parsing json  */

// For connecting to MongoDB database via mongoose
// database uri is stored in .env
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Requiring routerfiles
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

// Use files in certain routes
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

// Starts the server (terminal command: nodemon server)
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});