const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my-test-database');

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define a simple schema for a 'User' collection
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Define a route to create a new user
app.get('/create-user', async (req, res) => {
  try {
    // Create a new user instance
    const newUser = new User({
      name: 'John Doe',
      email: 'john.doe@example.com'
    });

    // Save the user to the database
    await newUser.save();

    res.send('User created successfully');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

// Define a route to get all users
app.get('/users', async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();

    res.send(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
