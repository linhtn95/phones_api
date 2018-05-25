const mongoose = require('mongoose');
const Phones = require('../models/phone');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

module.exports.controller = function (app) {
    //Get all phone
    app.get('/', (req, res) => {
        Phones.find({}, (err, phones) => {
            if (err) {
                console.log(err);
            }
            res.render('index', {
                phones: phones
            });
        });

    });
    //Get phone by id
    app.get('/phone/:_id', (req, res) => {
        Phones.findById(req.params._id, (err, phone) => {
            if (err) {
                console.log(err);
            }
            res.render('detail', {
                phone: phone
            });
        });
    });

    //add new phone
    app.get('/phone', (req, res) => {
        res.render('add');
    });

<<<<<<< HEAD
    app.post('/phone', upload.array('img'), (req, res) => {
        const img = req.files;
        const imgImage = img.map(element => element.path);
=======
    app.post('/phone', (req, res) => { 
>>>>>>> 1bc12b0178ef5fbb64f433d0e8fddd14fc6a27c4
        const phone = new Phones({
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price,
            img: imgImage
        });
        console.log('imge', phone.img);
        phone.save((err) => {
            if (!err) {
                return console.log('POST METHOD:', phone);
            } else {
                return console.log(err);
            }
        });
        res.redirect('/');
    });

    //Edit a phone
    app.get('/edit/:_id', (req, res) => {
        Phones.findById(req.params._id, (err, phone) => {
            if (err) {
                console.log(err);
            }
            res.render('edit', {
                phone: phone
            });
        });
    });

    app.post('/edit/:_id', (req, res) => {
        Phones.findByIdAndUpdate(req.params._id, req.body, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('PUT METHOD');
            }
        });
        res.redirect('/');
    });

    //Delete a phone
    app.post('/:_id', (req, res) => {
        Phones.remove({
            _id: req.params._id
        }, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('DELETE METHOD');
        });
        res.redirect('/');
    });
}