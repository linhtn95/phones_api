const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/phones_api', (error) => {
    if (error) throw error;
    console.log('MongoDB connected!');
});

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

fs.readdirSync('./controllers').forEach((file) => {
    if(file.substr(-3) == '.js') {
        route = require('./controllers/' + file);
        route.controller(app);
    }
});

app.listen(3000, () => console.log('Server is running at localhost:3000'));