const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

const appRoute = require('./src/routes/route-users');
app.use('/', appRoute);

app.listen(8080, ()=>{
    console.log('Server Berjalan di Port : 8080');
});