const express = require('express');
const router = express.Router();
const fileMiddleware = require('../../midleware/file');
const path = require('path')

const Book = require("../../models/book");



router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(book);
});

router.get('/:id', async (req, res) => {

    const {id} = req.params;
    try {
        const book =  await Book.findById(id).select('-__v')
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(404);
        res.json("books | not found")
    }
});

router.post('/', async (req, res) => {

    const {title,
        description,
        authors,
        favorite,
        fileCover,
        fileName  } = req.body;
    const newBook = new Book( { title , description,authors,favorite, fileCover, fileName} );
    try {
        await newBook.save();
        res.status(201);
        res.json(newBook);

    } catch (e) {
        console.error(e)
        res.json("")
    }

});

router.put('/:id', async (req, res) => {

    const {id} = req.params;
    const {title,description,authors,favorite,fileCover,fileName  } = req.body;
    try {
     await Book.findByIdAndUpdate(id, {title,description,authors,favorite,fileCover,fileName  })
        res.json(true);
    }
    catch (e) {
        console.error(e);
        res.status(404);
        res.json("book | not found");
    }

});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Book.deleteOne({_id: id})
        res.json(true);
    } catch (e) {
        console.error(e)
        res.status(404);
        res.json("book | not found")
    }


});



router.post('/upload-book/:id', fileMiddleware.single('fileBook'),async (req, res) => {

        const {id} = req.params;

        try {
            await Book.findByIdAndUpdate(id, {fileBook: req.file.filename});
            const {path} = req.file;
            res.json(path);
        } catch (e) {
            console.error(e);
            res.json(null);
        }

});


router.get('/:id/download-img', async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.findById(id, 'fileBook');
        const fileName = book.res.fileBook;
        res.download(__dirname + '/../public/' + fileName, 'cover.png', err => {
            if (err) {
                res.status(404).json();
            }
        });
    }
    catch (e) {
        console.error(e)
        res.status(404);
        res.json("")
    }
});




module.exports = router;
