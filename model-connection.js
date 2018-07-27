const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  title: String,
  nationality: String,
  favoriteQuote: String,
  image: String,
  whySofterDeveloper: String,
  motivatesMe: String,
  longTermVision: String,
  skills: []
})

const Student = mongoose.model("Student", studentSchema);

module.exports.Student = Student