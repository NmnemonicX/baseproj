const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/book')
    },
    filename(req, file, cb) {
        cb(null, file.originalname +'-'+Date.now() )
    }
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg','application/pdf','application/msword'];

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

module.exports = multer({
    storage, fileFilter
});
