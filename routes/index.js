const express = require('express');
const router = express.Router();
const passport = require("passport");
const Student = require('../models/student')
const User = require('../models/user')

router.get("/", (req, res) => {
  res.redirect("/students")
})

router.get("/register", (req, res) => {
  res.render("register")
})

router.post("/register", (req, res)=> {
  const newUser = new User({ username: req.body.username })
  User.register( newUser, req.body.password, (err, user)=>{
    if (err) {
      console.log('error: ', err)
      return res.render('register')
    }
    passport.authenticate('local')(req,res,()=>{
      res.redirect("/students")
    })
  })
})

router.get("/login", (req, res)=>{
  res.render('login')
})

//router.post("/", middleware, callback)
router.post("/login", passport.authenticate("local", {
  successRedirect: "/students",
  failureRedirect: "/login"
}) , (req, res)=>{
})

router.get("/logout", (req,res)=>{
  req.logout()
  res.redirect("/students")
})

module.exports = router;
