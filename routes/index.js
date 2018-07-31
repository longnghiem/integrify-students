const express = require('express');
const router = express.Router();

const Student = require('../models/student')


router.get('/', (req, res) => {
  Student.find({},(err, students) =>{
    if (err) return handleError(err)
    else {
      res.render('students/index', { students });
    }
  })
});

router.post('/', (req, res) => {
  Student.collection.insert(req.body, err => {
    if (err) return handleError(err)
    else {
      res.redirect('/')
    }
  })
})


module.exports = router;
