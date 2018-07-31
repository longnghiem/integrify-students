const express = require("express")
const router = express.Router()

const Student = require('../models/student')


//specifying param
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Student.findOne({_id : id})
         .populate("comments")
         .exec((err, result) => {
            if (err) return handleError(err)
            else {
              console.log(result)
              res.render('students/show', { result })
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

router.get("/:id/comments/new", (req,res)=>{
  const id = req.params.id;
  Student.findOne({_id:id}, (err, student)=>{
    if (err) return handleError(err)
    else {
      console.log('student', student)
      res.render('comments/new',{student})
    }
  })


  
})

module.exports = router