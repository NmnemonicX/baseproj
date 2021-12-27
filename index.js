const express  = require('express');
const cors = require('cors');
const formData = require("express-form-data");
const bodyParser = require("body-parser");

const loggerMiddleware = require('./midleware/logger');
const errorMiddleware = require('./midleware/error');

const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');
const bookRoute = require('./routes/book');


const app = express();

//app.use(formData.parse());  //не работает совместно с multer
app.use(bodyParser());
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
// app.use(bodyParser.text());

app.use(cors());

app.use(loggerMiddleware);


app.use('/public', express.static(__dirname+"/public"));
app.use('/', indexRoute);
app.use('/api/user/',userRoute);
app.use('/api/books/',bookRoute);

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
