const express = require('express');
const {Book} = require("../models");
const router = express.Router();
const fileMiddleware = require('../midleware/file');
const path = require('path')
const redis = require("redis");


//const clientRed = redis.createClient({ url:`redis://${REDIS_URL}`})
const clientRed = redis.createClient({ url:`redis://storage`})
//const client = redis.createClient({    host: REDIS_URL        })
clientRed.connect()

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
        fileBook:"",
        counter:""
    },
    {
        id: "2",
        title: "linux guru",
        description: "for admins",
        authors: "and me",
        favorite: "aaa",
        fileCover: "Cover2",
        fileName: "lnx.doc",
        fileBook:"",
        counter:"0"

    }
]

stor.book.push(...BOOKS)



router.get('/', async(req, res) => {
    const {book} = stor;

    for (const item of book) {
        const counter = await clientRed.get(item.id)
        console.log('counter ',counter)
        item.counter=counter;
    }


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

router.post('/counter/:id/incr',async (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
    const x= await clientRed.incr(id)
    console.log(`id= ${id} и counter = ${x}`)
     if (idx !== -1) {
         res.redirect(`/books`);
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
