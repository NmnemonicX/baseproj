const express = require('express');
const {Book} = require("../models");
const router = express.Router();
const fileMiddleware = require('../midleware/file');
const path = require('path')



const stor = {
    book:[],
};

const BOOKS = [
    {
        id: "1",
        title: "windows guru",
        description: "for users",
        authors: "i am",
        favorite: "what",
        fileCover: "Cover",
        fileName: "win1.doc",
        fileBook:""
    },
    {
        id: "2",
        title: "linux guru",
        description: "for admins",
        authors: "and me",
        favorite: "aaa",
        fileCover: "Cover2",
        fileName: "lnx.doc",
        fileBook:""

    }
]

stor.book.push(...BOOKS)



router.get('/', (req, res) => {
    const {book} = stor;

    res.render("book/index", {
        title: "Book",
        books: book,
    });
});



router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Boook | create",
        book: {},
    });
});



router.post('/create', (req, res) => {
    const {book} = stor;
    const {title,
        description,
        authors,
        favorite,
        fileCover,
        fileName  } = req.body;
    const newBook = new Book( undefined , title , description,authors,favorite, fileCover, fileName );
    book.push(newBook);

    res.redirect('/books')
});

router.get('/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("book/view", {
            title: "Book | view",
            book: book[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});



router.get('/update/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("book/update", {
            title: "Boook | view",
            book: book[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const {title,description,authors,favorite,fileCover,fileName  } = req.body;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book[idx] = {
            ...book[idx],
            title,description,authors,favorite,fileCover, fileName
        };
        res.redirect(`/books/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});



router.post('/delete/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.redirect(`/books`);
    } else {
        res.status(404).redirect('/404');
    }
});




module.exports = router;
