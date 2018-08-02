const express = require("express")
const router = express.Router()

const Student = require('../models/student')
const Comment = require('../models/comment')

const helper = require("../utils/helper")
const isLoggedIn = helper.isLoggedIn


//specifying param
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Student.findOne({_id : id})
         .populate("comments")
         .exec((err, student) => {
            if (err) {console.log("error: ", err)}
            else {
              console.log(student)
              res.render('students/show', { student })
            }
          })
  })

router.delete("/:id", isLoggedIn, (req, res) => {
  const id = req.params.id;
  Student.deleteOne({_id : id}, err => {
    if (err) {console.log('error: ', err)}
    else {
      res.redirect("/index")
    }
  })
})

router.get("/:id/comments/new", isLoggedIn , (req,res)=>{
  const id = req.params.id;
  Student.findOne({_id:id}, (err, student)=>{
    if (err) {console.log("error: ", err)}
    else {
      res.render('comments/new',{student})
    }
  })

router.post("/:id/comments", isLoggedIn, (req, res) => {
  Student.findById(req.params.id, (err, student)=>{
    if (err) {console.log("error: ", err)}
    else {
      console.log('req body comment: ', req.body.comment)
      Comment.create(req.body.comment, (err, comment)=>{
        if (err) {console.log("error: ", err)}
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