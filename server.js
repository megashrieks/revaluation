const express = require('express');
const app = express();
const port = 5000;

app.use(require('cors')());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/auth', require('./server/auth'));


app.listen(port, () => console.log(`listening to port ${port}`))