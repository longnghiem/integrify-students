const express = require("express")
const router = express.Router();
const passport = require("passport")

router.get("/", (req,res)=>{
  req.logout()
  res.redirect("/index")
})

module.exports = router