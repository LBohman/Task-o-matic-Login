const express = require("express");
const mongoose = require("mongoose");

const User = require("../model/user");

const router = express.Router();

const errors = " ";
router.get("/register", (req, res) =>{
    res.render("register.ejs", { errors });
});

// hash password!
router.post("/register", async (req, res) => {
    const errors = [];
    if(!req.body.name) {
        errors.push("Username is required");
    }

    if(!req.body.password) {
        errors.push(" Password is required");
    }

    if(!req.body.name || !req.body.password) {
        res.render("register.ejs", { errors });
    }

    const user = await new User({
        name: req.body.name,
        password: req.body.password
    }).save();
    res.redirect("/login");
});

router.get("/login", (req, res) => {
    res.render("login.ejs");
});

router.post("/login", async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    const username = await User.find({name:name});
    const userPassword = await User.find({password:password});

    if(username[0].name === name && userPassword[0].password === password) {
        res.send("Inloggning lyckades!");
    } else {
        res.send("Inloggningen misslyckades, försök igen.");
    }
});

module.exports = router;