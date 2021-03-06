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

module.exports.controller = function (app, passport) {
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

    app.post('/phone', upload.array('img'), (req, res) => {
        const img = req.files;
        const imgImage = img.map(element => element.path);
        const phone = new Phones({
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price,
            img: imgImage
        });
        phone.save((err) => {
            if (!err) {
                req.flash('success', 'Adding Successfully!');
                res.redirect('/');
            } else {
                req.flash('error', 'Adding Failed! Please try again!');
                res.redirect('/phone');
            }
        });
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
                req.flash('error', 'Update Failed! Please try again!');
                res.redirect('/edit/:_id');
            } else {
                req.flash('success', 'Updated Successfully!');
                res.redirect('/');
            }
            
        });
    });

    //Delete a phone
    app.post('/:_id', (req, res) => {
        Phones.remove({
            _id: req.params._id
        }, (err) => {
            if (err) {
                req.flash('error', 'Delete Failed! Please try again!');
            }
            // console.log('DELETE METHOD');
            req.flash('success', 'Delete Successfully!');
            res.redirect('/');
        });
    });
}
