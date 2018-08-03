const express = require('express');
//mergeParams: true => when defining param in app.js
const router = express.Router({mergeParams: true});

const Student = require('../models/student');
const Comment = require('../models/comment');

const helper = require('../utils/helper');
const isLoggedIn = helper.isLoggedIn;

router.get('/new', isLoggedIn, (req, res) => {
  const id = req.params.id;
  console.log(id)
  Student.findOne({ _id: id }, (err, student) => {
    if (err) {
      console.log('error: ', err);
    } else {
      res.render('comments/new', { student });
    }
  });
});

router.post('/', isLoggedIn, (req, res) => {
  Student.findById(req.params.id, (err, student) => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('req body comment: ', req.body.comment);
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log('error: ', err);
        } else {
          student.comments.push(comment);
          student.save();
          res.redirect('/students/' + req.params.id);
        }
      });
    }
  });
});

module.exports = router;
