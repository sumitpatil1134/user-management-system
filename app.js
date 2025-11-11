const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Sample Users Data
let users = [
    { userUniqueId: "1", userName: "Aditya Gupta", userEmail: "aditya@gmail.com", userAge: "22" },
    { userUniqueId: "2", userName: "Vanshita Jaiswal", userEmail: "vanshita@gmail.com", userAge: "21" },
    { userUniqueId: "3", userName: "Sachin Yadav", userEmail: "sachin@gmail.com", userAge: "22" }
];
// Home Route - Display Users
app.get("/", (req, res) => {
    res.render("home", { data: users });
});
// Add User Route
app.post("/", (req, res) => {
    const newUser = {
        userUniqueId: req.body.userUniqueId,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userAge: req.body.userAge
    };
    users.push(newUser);
    res.render("home", { data: users });
});
// Delete User Route
app.post('/delete', (req, res) => {
    const requestedUserUniqueId = req.body.userUniqueId;
    users = users.filter(user => user.userUniqueId !== requestedUserUniqueId);
    res.render("home", { data: users });
});
// Update User Route
app.post('/update', (req, res) => {
    users.forEach(user => {
        if (user.userUniqueId === req.body.userUniqueId) {
            user.userName = req.body.userName;
            user.userEmail = req.body.userEmail;
            user.userAge = req.body.userAge;
        }
    });
    res.render("home", { data: users });
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});