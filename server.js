const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 5000;
const { db_url } = require('./credentials/credentials');
const auth_routes = require('./server/auth');
const admin_routes = require('./server/admin');


mongoose.connect(db_url, { useNewUrlParser: true })
.then(_ => console.log('connected to db'))
.catch(_ => console.log('error connecting to db'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/auth', auth_routes);

app.use('/api/admin', admin_routes);

app.listen(port, () => console.log(`listening to port ${port}`))