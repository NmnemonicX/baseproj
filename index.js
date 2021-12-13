const express  = require('express');
const cors = require('cors');

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

stor.book.push(BOOKS)

const app = express();

app.use(cors())

app.post('/api/user/login', (req, res) =>
{
  res.status(201);
  res.json('{ id: 1, mail:"test@mail.ru" }')
});

app.get('/api/books', (req, res) => {
    const {book} = stor.book;
    res.json(book);
});
app.get('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    console.log('book',book)
    console.log('id',id)
    const idx = book.find(el => el.id === "1")   ///findIndex(el => el.id === "1");
    console.log('idx',idx)

    if (idx !== null) {
        res.json(idx);
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

    const newBook = new Book(title,
        description,
        authors,
        favorite,
        fileCover,
        fileName );
    book.push(newBook);

    res.status(201);
    res.json(newBook);
});
app.put('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {title,description,authors,favorite,fileCover, fileName  } = req.body;
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
