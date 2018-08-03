const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const helper = require("../utils/helper")
const isLoggedIn = helper.isLoggedIn

//index - show all students
router.get('/', (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      console.log('error: ', err);
    } else {
      res.render('students/index', { students });
    }
  });
});

//CREATE - add new student
router.post('/', (req, res) => {
  Student.collection.insert(req.body, (err) => {
    if (err) {
      console.log('error: ', err);
    } else {
      res.redirect('/students');
    }
  });
});

//NEW - form to add new student
router.get('/new', isLoggedIn, (req, res) => {
  res.render('students/new');
});

//SHOW - info page of 1 student
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Student.findOne({ _id: id })
    .populate('comments')
    .exec((err, student) => {
      if (err) {
        console.log('error: ', err);
      } else {
        console.log(student);
        res.render('students/show', { student });
      }
    });
});

//DELETE 
router.delete("/:id", isLoggedIn, (req, res) => {
  const id = req.params.id;
  Student.deleteOne({_id : id}, err => {
    if (err) {console.log('error: ', err)}
    else {
      res.redirect("/students")
    }
  })
})

module.exports = router