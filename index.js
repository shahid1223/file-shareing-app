const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connectToMongo = require('./config/db');
const path = require('path');

app.use(express.static('public'));

//template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

connectToMongo();

app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/files'));
app.use('/api', require('./routes/show'));
app.use('/api', require('./routes/download'));

app.listen(PORT, () => {
    console.log(`file sharing app is listening at http://localhost:${PORT}`);
})