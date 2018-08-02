const express = require("express")
const router = express.Router()
const User = require("../models/user")
const passport = require("passport")

router.get("/", (req, res) => {
  res.render("register")
})

router.post("/", (req, res)=> {
  const newUser = new User({ username: req.body.username })
  User.register( newUser, req.body.password, (err, user)=>{
    if (err) {
      console.log('error: ', err)
      return res.render('register')
    }
    passport.authenticate('local')(req,res,()=>{
      res.redirect("/index")
    })
  })
})


module.exports = router;
