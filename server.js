const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const secretKey = 'your_secret_key';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Route handling for pages
app.get('/:page', (req, res) => {
  const page = req.params.page.toLowerCase();
  const validPages = ['about', 'room', 'feature', 'menu', 'news'];

  if (validPages.includes(page)) {
    res.render(page, { title: page.charAt(0).toUpperCase() + page.slice(1) });
  } else {
    res.status(404).send('Page not found');
  }
});

// Default route for the home page
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

const usersFilePath = path.join(__dirname, 'users.json');

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Read existing users
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const users = data ? JSON.parse(data) : [];

    // Check if the user exists
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    // Return success response with initials
    res.status(200).json({ message: 'Login successful', initials: user.initials });
  });
});

app.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Read existing users
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const users = data ? JSON.parse(data) : [];

    // Check if the email already exists
    if (users.some((user) => user.email === email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Add the new user
    const initials = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
    const newUser = { firstName, lastName, email, password, initials };
    users.push(newUser);

    // Save the updated users list
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error('Error writing to users.json:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(201).json({ message: 'User registered successfully', initials });
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
