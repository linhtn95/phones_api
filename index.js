const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/phones_api', (error) => {
    if (error) throw error;
    console.log('MongoDB connected!');
});

const app = express();
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

const phoneSchema = new Schema({
    name: String,
    brand: String,
    price: Number,
    img: String
});

const Phones = mongoose.model('Phones', phoneSchema);

app.get('/', (req, res) => {
    Phones.find({}, (err, phones) => {
        if (err) {
            console.log(err);
        }
        console.log('GET METHOD: ', phones);
    });
    res.end('GET');
});

app.post('/', (req, res) => {
    const phone = new Phones({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        img: req.body.img
    });
    phone.save((err) => {
        if (!err) {
            return console.log('POST METHOD:', phone);
        } else {
            return console.log(err);
        }
    });
    res.end("POST");
});

app.put('/:id', (req, res) => {
    Phones.findByIdAndUpdate(req.params.id, req.body, (err) => {
        console.log(req.body);
        if (err) {
            console.log(err);
        } else {
            console.log('PUT METHOD');
        }
    });
    res.end('PUT');
});

app.delete('/:id', (req, res) => {
    Phones.remove({
        _id: req.params.id
    }, (err) => {
        if (err) {
            res.send(err);
        }
        console.log('DELETE METHOD');
    });
    res.end('DELETE');
});

app.listen(3000, () => console.log('Server is running!'));