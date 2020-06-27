const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'andubarbu',
        password: '',
        database: 'smart-brain'
    }
})

const app = express();

app.use(express.json());
app.use(cors());

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.getProfile(req, res, db));
app.put('/image', (req, res) => image.getImageCount(req, res, db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(3000, () => {
    console.log('App is running on port 3000');
});