const express  = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const redis = require('redis');

const clientRed = redis.createClient({ url:`redis://storage`})

clientRed.connect()

const app = express();

app.use(bodyParser());
app.use(cors());



app.get('/counter/:id', async (req, res) => {
    const {id} = req.params;
    console.log(`зашли в /counter/:id c параметром ${id}`)
    const counter = await clientRed.get(id)
    console.log(`запрошен counter ${id}  и он равен ${counter}`)
    res.status(200);
    res.json(counter);
});



app.post('/counter/:id/incr', async(req, res) => {
    console.log(`/counter/:id/incr`)
    const {id} = req.params;
    const x= await clientRed.incr(id)

    res.status(201);
    res.json(x);

});




const PORT = process.env.PORT||5000;
const REDIS_URL = process.env.REDIS_URL ||'localhost';
app.listen(PORT,()=>{
    console.log(` server run in port= ${PORT} `)
    }
);

