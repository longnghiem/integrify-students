const express = require("express")
const router = express.Router();

router.get("/", (req, res) => {
  res.render('students/new')
})


module.exports = router;