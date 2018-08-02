const express = require("express")
const router = express.Router();
const passport = require("passport")

router.get("/", (req, res)=>{
  res.render('login')
})

//router.post("/", middleware, callback)
router.post("/", passport.authenticate("local", {
  successRedirect: "/index",
  failureRedirect: "/login"
}) , (req, res)=>{

})

module.exports = router