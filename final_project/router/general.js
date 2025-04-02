const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

//Task 6
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }
  if (isValid(username)) {
    return res.status(409).json({ message: "Username already exists." });
  }
  users.push({ "username":username, "password": password });
  return res.status(201).json({ message: "User successfully registered." });
});

// Task 1
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books, null, 4));
});

// Task 2
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books.hasOwnProperty(isbn)) {
    const book = books[isbn];
    res.send(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
 });
  
// Task 3
public_users.get('/author/:author',function (req, res) {
  const getAuthor = req.params.author;
  const bookKeys = Object.keys(books);
  const matchingBooks = [];

  bookKeys.forEach (key => {
    if (books[key].author === getAuthor) {
      matchingBooks.push(books[key]);
    }
  });
  if (matchingBooks.length > 0) {
    res.send(matchingBooks);
  } else {
    res.status(404).send("No books found by that author.");
  }
});

// Task 4
public_users.get('/title/:title',function (req, res) {
  const getTitle = req.params.title;
  const bookKeys = Object.keys(books);
  const matchingBooks = [];
  bookKeys.forEach (key => {
    if (books[key].title === getTitle) {
      matchingBooks.push(books[key]);
    }
  });
  if (matchingBooks.length > 0) {
    res.send(matchingBooks);
  } else {
    res.status(404).send("No books found by that title.");
  }
});

//Task 5
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books.hasOwnProperty(isbn)) {
    const book = books[isbn];
    res.send(book.reviews);
  } else {
    res.status(404).send("No Review found for mentioned ISBN.");
  }
});

// Task 10

public_users.get('/async', async function (req, res) {
  const getBooks = await axios.get("http://localhost:5000/");
  const getBooksData = getBooks.data;
  return res.json(getBooksData);
});

// Task 11

public_users.get('/async/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  const getBook = await axios.get("http://localhost:5000/isbn/" + isbn);
  const getBookData = getBook.data;
  return res.json(getBookData);
});

// Task 12

public_users.get('/async/author/:author', async function (req, res) {
  const getAuthor = req.params.author;
  const getBooks = await axios.get("http://localhost:5000/author/" + getAuthor);
  const getBooksData = getBooks.data;
  return res.json(getBooksData);
});

// Task 13

public_users.get('/async/title/:title', async function (req, res) {
  const getTitle = req.params.title;
  const getBooks = await axios.get("http://localhost:5000/title/" + getTitle);
  const getBooksData = getBooks.data;
  return res.json(getBooksData);
});

module.exports.general = public_users;