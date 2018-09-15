const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 5000;

const auth_routes = require('./server/auth');
const admin_routes = require('./server/admin');
const student_routes = require('./server/student');
const clerk_routes = require('./server/clerk');

const check_token_gen = require('./server/utils/check_token');
const admin_check_token = check_token_gen(admin_flag = 1);
const student_check_token = check_token_gen(admin_flag = 0);
const clerk_check_token = check_token_gen(admin_flag = 2);



const { db_url } = require('./credentials/credentials');
mongoose.connect(process.argv[2] || db_url, { useNewUrlParser: true })
.then(_ => console.log('connected to db'))
.catch(_ => console.log('error connecting to db'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/auth', auth_routes);

app.use('/api/admin', admin_check_token, admin_routes);

app.use('/api/student', student_check_token, student_routes);

app.use('/api/clerk', clerk_check_token, clerk_routes);

app.listen(port, () => console.log(`listening to port ${port}`))