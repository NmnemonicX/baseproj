const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('<h2>просто Index</h2>');
// });

router.get('/', (req, res) => {
    res.render("index", {
        title: "Главная",
    });
});

module.exports = router;
