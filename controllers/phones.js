const mongoose = require('mongoose');
const Phones = require('../models/phone');
console.log(Phones);
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
            console.log(phone);
        });
    });

    //add new phone
    app.get('/phone', (req, res) => {
        res.render('add');
    });

    app.post('/phone', (req, res) => { 
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
