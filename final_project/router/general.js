const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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

module.exports.general = public_users;
