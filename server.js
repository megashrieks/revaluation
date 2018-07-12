const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const { db_url } = require('./credentials/credentials');

mongoose.connect(db_url, { useNewUrlParser: true })
.then(_ => console.log('connected to db'))
.catch(_ => console.log('error connecting to db'));


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/auth', require('./server/auth'));


app.listen(port, () => console.log(`listening to port ${port}`))