const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  title: String,
  nationality: String,
  favoriteQuote: String,
  image: String,
  whySoftwareDeveloper: String,
  motivatesMe: String,
  longTermVision: String,
  skills: [],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
})

const Student = mongoose.model("Student", studentSchema);

module.exports = Student