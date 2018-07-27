const express = require("express")
const router = express.Router()

const model = require('../model-connection')
const Student = model.Student

//specifying param
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Student.findOne({_id : id}, (err, result) => {
    if (err) return handleError(err)
    else {
      res.render('student', { result })
    }
  })
})

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Student.deleteOne({_id : id}, err => {
    if (err) return handleError(err)
    else {
      //manually send a response to make sure there is no err. Checked by fetch function
      res.send({'status': 'Deleted'}) 
    }
  })
})

module.exports = router