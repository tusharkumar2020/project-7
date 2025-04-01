const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Task 7

const isValid = (username)=>{
  return users.some((user) => user.username === username);
}

const authenticatedUser = (username,password)=>{
  let validLogin = false;
  users.forEach((user) => {
    if(user.username === username) {
      if (user.password === password) {
      validLogin = true;
    }
  }})
  return validLogin;
};
//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (!username || !password) {
    return res.status(404).json({ message: "Please enter valid username and password" });
  }
  
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({data: password}, "fingerprint_customer", { expiresIn: 3600 });
    req.session.authorization = { accessToken };
    return res.status(200).json({ message: "User successfully logged in" });
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Task 8
regd_users.put("/auth/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;

  if (!isbn || !review) {
    return res.status(400).json({ message: "ISBN and review are required." });
  }
  if (books.hasOwnProperty(isbn)) {
    const book = books[isbn];
    book[isbn].reviews[username] = review;
    return res.status(200).json({ message: "Review added successfully." });
  } else {
      return res.status(404).json({ message: "Book not found." });
  }
  }
);

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
