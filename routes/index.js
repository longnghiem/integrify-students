const express = require('express');
const router = express.Router();

const model = require('../model-connection')
const Student = model.Student 


router.get('/', (req, res) => {
  Student.find({},(err, students) =>{
    if (err) return handleError(err)
    else {
      res.render('index', { students });
    }
  })
});

router.post('/', (req, res) => {
  console.log(req.body)
  let {firstName, title, nationality, favoriteQuote, image, skills} = req.body;
  Student.collection.insert(req.body, err => {
    if (err) return handleError(err)
    else {
      res.redirect('/')
    }
  })
})


module.exports = router;
