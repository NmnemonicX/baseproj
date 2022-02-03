const express = require('express');
const {Book} = require("../models");
const router = express.Router();
const fileMiddleware = require('../midleware/file');
const path = require('path')

const axios = require('axios');

// const clientRed = redis.createClient({ url:`redis://storage`})

// clientRed.connect()

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
        counter:"1"
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

async function initBook() {
    for (const item of stor.book) {
        await axios.get(`http://app_counter:5000/counter/${item.id}`).then(resp => {

            console.log('resp.data', resp.data);
            item.counter = resp.data;

        });

    }
}

initBook()


router.get('/', async (req, res) => {
    const {book} = stor;

    for (const item of book) {
      //  const counter = await clientRed.get(item.id)
        console.log(`http://localhost:5000/counter/${item.id}`)

         await axios.get(`http://app_counter:5000/counter/${item.id}`).then(resp => {
            console.log('resp.data',resp.data);
            item.counter=resp.data;
        });

        console.log('item.counter = ',item.counter)

    }

    console.log('вызываю отрисовку')
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
    console.log(`вошли request /counter/:${id}/incr`)
      const idx = book.findIndex(el => el.id === id);

    await axios.post(`http://app_counter:5000/counter/${id}/incr`).then(resp => {  console.log(`id incr= ${id} и counter = ${resp.data}`)   });


    console.log(`вышли из request`)
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
