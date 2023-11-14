const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Dummy database (replace this with a real database)
const users = [];

// Routes


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});


app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    // Validate email format (you can add more validation)
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.send('Invalid email format');
    }

    // Validate password (you can add more constraints)
    if (password.length < 8) {
        return res.send('Password must be at least 8 characters long');
    }

    // Hash password before storing (use bcrypt for better security)
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Store user data (replace this with database storage)
    users.push({ email, password: hashedPassword });

    res.send('Registration successful');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email (replace this with database query)
    const user = users.find(u => u.email === email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.send('Invalid email or password');
    }

    req.session.user = user; // Store user session
    res.send('Login successful');    
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
