const express  = require('express');
const cors = require('cors');
const formData = require("express-form-data");


const {Book}=require('./models');

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

const app = express();
app.use(formData.parse());
app.use(cors());

app.post('/api/user/login', (req, res) =>
{
  res.status(201);
  res.json('{ id: 1, mail:"test@mail.ru" }')
});

app.get('/api/books', (req, res) => {
    console.log(stor)
    const {book} = stor;
    console.log(book)
    res.json(book);
});
app.get('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    // console.log('book',book)
    // console.log('id',id)

    const idx = book.findIndex(el => el.id === id);
    // console.log('idx',idx)

    if (idx !== null) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});
app.post('/api/books', (req, res) => {
    const {book} = stor;
    const {title,
        description,
        authors,
        favorite,
        fileCover,
        fileName  } = req.body;
// console.log(req.body);
    const newBook = new Book( undefined , title , description,authors,favorite, fileCover, fileName );
    // console.log(newBook)
    book.push(newBook);
    res.status(201);
    res.json(newBook);
});
app.put('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {title,description,authors,favorite,fileCover,fileName  } = req.body;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
    // console.log('title',title)
    // console.log(idx)
    if (idx !== -1) {
        // console.log(book[idx])
        book[idx] = {
            ...book[idx],
            title,description,authors,favorite,fileCover, fileName
        };
        // console.log(book[idx])
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});
app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(` server run in port= ${PORT} `)
    }
);
