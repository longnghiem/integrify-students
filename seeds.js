const mongoose = require("mongoose");
const Student = require("./models/student")
const Comment = require("./models/comment")
const students = require("./data")

const seedDB = () => {
  //Remove all students
  Student.remove({}, err=> {
    if (err) return handleError(err)
    else {
      console.log('removed all students')
    }
  })
  // add a few students
  students.forEach(seed => {
    Student.create(seed, (err, student) => {
      if (err) return handleError(err)
      else {
        console.log("added a student")
        //create a comment
        Comment.create({
          text: "Great avatar!",
          author: "Alex"
        }, (err, comment) => {
          if (err) return handleError(err)
          else {
            student.comments.push(comment)
            student.save()
            console.log('created new comment')
          }
        })
      }
    })
  })
  
}

module.exports = seedDB