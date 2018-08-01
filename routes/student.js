const express = require("express")
const router = express.Router()

const Student = require('../models/student')
const Comment = require('../models/comment')


//specifying param
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Student.findOne({_id : id})
         .populate("comments")
         .exec((err, student) => {
            if (err) return handleError(err)
            else {
              console.log(student)
              res.render('students/show', { student })
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
      res.render('comments/new',{student})
    }
  })

router.post("/:id/comments", (req, res) => {
  Student.findById(req.params.id, (err, student)=>{
    if (err) return handleError(err)
    else {
      console.log('req body comment: ', req.body.comment)
      Comment.create(req.body.comment, (err, comment)=>{
        if (err) return handleError(err)
        else {
          student.comments.push(comment)
          student.save()
          res.redirect("/student/" + req.params.id)
        }
      })
    }
  })
})
  
})

module.exports = router