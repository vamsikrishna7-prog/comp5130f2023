// server.js
const fs = require('fs');
const cors = require('cors');
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../'))

const usersFileName = 'users.json';
let users = [];

function readJSONFile(filePath) {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading JSON file:', error.message);
        return [];
    }
}

function writeJSONFile(filePath, data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonData, 'utf8');
        console.log('Data written to JSON file successfully.');
    } catch (error) {
        console.error('Error writing to JSON file:', error.message);
    }
}

function getHashedPass(password) {
    var hash = crypto.createHash('sha256');
    data = hash.update(password, 'utf-8');
    return data.digest('hex');
}

if (!fs.existsSync(usersFileName)) {
    fs.writeFileSync(usersFileName, '[]', 'utf-8');
} else {
    users = readJSONFile(usersFileName)
}

const path = require('path');

app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname,  '../manifest.json'));
});

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../service-worker.js'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  '../main.html'));
});

app.post('/signup', (req, res) => {
    try {
        const { firstname, lastname, email, password, dob } = req.body;
        let users = readJSONFile(usersFileName)
        console.log(`sign up in request for ${email}`)
        if (users.some(user => user.email === email)) {
            res.status(400).send({server_message: 'User with same email already exists, try signing in'});
        } else {
            const encryptedPassword = getHashedPass(password);
            users.push({ firstname, lastname, email, encryptedPassword, dob });
            writeJSONFile(usersFileName, users)
            res.status(200).send({server_message: 'User sign-up successful'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({server_message: 'Internal server error'});
    }
});

app.post('/signin', (req, res) => {
    try {
        const { email, password } = req.body;
        let users = readJSONFile(usersFileName);
        console.log(`sigin request for ${email}`)
        const user = users.find(user => user.email === email && user.encryptedPassword === getHashedPass(password));
        if (user) {
            res.status(200).send({server_message: 'Signin successful'});
        } else {
            res.status(400).send({server_message: 'Invalid credentials'});
        }
    } catch (error) {
        res.status(500).send({server_message: 'Internal server error'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
