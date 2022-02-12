const express = require('express');
const router = express.Router();
const fileMiddleware = require('../midleware/file');
const path = require('path')
const axios = require('axios');

const Book = require("../models/book");


router.get('/', async (req, res) => {

    const books = await Book.find();

    res.render("book/index", {
        title: "Book",
        books: books,
    });
});



router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Boook | create",
        book: {},
    });
});



router.post('/create', async (req, res) => {

    const {title,
        description,
        authors,
        favorite,
        fileCover,
        fileName  } = req.body;
    const newBook = new Book( { title , description,authors,favorite, fileCover, fileName} );
      try {
        await newBook.save();
        res.redirect('/books')

    } catch (e) {
        console.error(e)
        res.json("")
    }
});

router.get('/:id', async (req, res) => {

    const {id} = req.params;

    try {
        const book =  await Book.findById(id).select('-__v')
        res.render("book/view", {
            title: "Books | view",
            book: book,
        })
    } catch (e) {
        console.error(e);
        res.status(404);
        res.json("books | not found")
    }
});



router.get('/update/:id', async (req, res) => {

    const {id} = req.params;
    try {
        const book = await Book.findById(id).select('-__v')
        res.render("book/update", {
            title: "Books | view",
            book: book,
        })
    } catch (e) {
        console.error(e);
        res.status(404);
        res.json("books | not found")
    }

});

router.post('/update/:id',async (req, res) => {
    const {id} = req.params;
    const {title,description,authors,favorite,fileCover,fileName  } = req.body;
    try {
        await Book.findByIdAndUpdate(id, {title,description,authors,favorite,fileCover,fileName  })
        res.redirect(`/books/${id}`);
    }
    catch (e) {
        console.error(e);
        res.status(404);
        res.json("book | not found");
    }
});



router.post('/delete/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Book.deleteOne({_id: id})
        res.redirect('/books')
    } catch (e) {
        console.error(e)
        res.status(404);
        res.json("book | not found")
    }
});




module.exports = router;
