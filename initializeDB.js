const students = require('./data')
const model = require('./model-connection')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Integrify', { useNewUrlParser: true })

const Student = model.Student

Student.collection.insert(students, (err, students)=>{
  if (err) {
    return console.error(err)
  } else {
    console.log('Added multiple students')
  }
})
