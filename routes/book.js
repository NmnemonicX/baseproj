const express = require('express');
const {Book} = require("../models");
const router = express.Router();
const fileMiddleware = require('../midleware/file');



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
        fileName: "win1.doc"
    },
    {
        id: "2",
        title: "linux guru",
        description: "for admins",
        authors: "and me",
        favorite: "aaa",
        fileCover: "Cover2",
        fileName: "lnx.doc"
    }
]

stor.book.push(...BOOKS)



router.get('/', (req, res) => {
    const {book} = stor;
    res.json(book);
});

router.get('/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== null) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.post('/', (req, res) => {
    const {book} = stor;
    const {title,
        description,
        authors,
        favorite,
        fileCover,
        fileName  } = req.body;
    const newBook = new Book( undefined , title , description,authors,favorite, fileCover, fileName );

    book.push(newBook);
    res.status(201);
    res.json(newBook);
});

router.put('/:id', (req, res) => {
    const {book} = stor;
    const {title,description,authors,favorite,fileCover,fileName  } = req.body;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book[idx] = {
            ...book[idx],
            title,description,authors,favorite,fileCover, fileName
        };
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.delete('/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json("book | not found");
    }


});



router.post('/upload-file',
    fileMiddleware.single('fileBook'),
    (req, res) => {
    if (req.file) {
        const {path} = req.file;
        console.log(path);

        res.json(path);
    } else {
        res.json(null);
    }
});




module.exports = router;
