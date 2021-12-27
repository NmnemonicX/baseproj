const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/book')
    },
    filename(req, file, cb) {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
});

const allowedTypes = [ 'application/msword','application/pdf', 'application/json', 'image/jpeg','text/plain'];

const fileFilter = (req, file, cb) => {
   // if (allowedTypes.includes(file.mimetype)) {
    console.log(req);
    if (1==1) {
        cb(null, true)
        console.log('true-load');
    } else {
        cb(null, false)
        console.log('false-load');
    }
};

module.exports = multer({
    storage, fileFilter
});
