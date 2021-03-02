const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/register", (req, res) =>{
    res.render("register.ejs");
});

router.post("/register", (req, res)=> {
    res.send("Submit");
});

module.exports = router;