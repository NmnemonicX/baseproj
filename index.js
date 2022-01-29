const express  = require('express');
const cors = require('cors');
const formData = require("express-form-data");
const bodyParser = require("body-parser");

const loggerMiddleware = require('./midleware/logger');
const errorMiddleware  = require('./midleware/error');

const indexRoute = require('./routes/index');
const userApiRoute = require('./routes/api/user');
const bookRoute = require('./routes/book');
const bookApiRoute = require('./routes/api/book');

const app = express();
//app.use(formData.parse());  //не работает совместно с multer
app.use(bodyParser());
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
// app.use(bodyParser.text());
app.set('view engine', 'ejs');
app.use(cors());
app.use(loggerMiddleware);

app.use('/public', express.static(__dirname+"/public"));
app.use('/', indexRoute);

app.use('/books/',bookRoute);

app.use('/api/user/',userApiRoute);
app.use('/api/books/',bookApiRoute);

app.use(errorMiddleware);

// app.use((err,req,res,next)={  //не робит
//     res.status(500).json({
//         error: err.toString(),
//     })
// })

const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(` server run in port= ${PORT} `)
    }
);

