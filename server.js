const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Serve static files (CSS, JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for the login page (login.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve login.json when requested
app.get('/login.json', (req, res) => {
    fs.readFile(path.join(__dirname, 'login.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error loading JSON file');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Serve other pages (homeEmp.html and homeCus.html)
app.get('/homeEmp.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'homeEmp.html'));
});

app.get('/homeCus.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'homeCus.html'));
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
