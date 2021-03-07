const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/userVerify");


const User = require("../model/user");

const router = express.Router();

const errors = [];

router.get("/", (req, res) => {
    res.render("login.ejs");
});

router.get("/register", (req, res) =>{
    res.render("register.ejs", { errors });
});

router.post("/register", async (req, res) => {
    if(!req.body.name) {
        errors.push("Username is required");
    }

    if(!req.body.password) {
        errors.push(" Password is required");
    }

    if(!req.body.name || !req.body.password) {
        res.render("register.ejs", { errors });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await new User({
        name: req.body.name,
        password: hashedPassword
    }).save();
    res.redirect("/login");
});

router.get("/login", (req, res) => {
    res.render("login.ejs");
});

router.post("/login", async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    
    const user = await User.findOne({name:name});

    const passwordCompare = await bcrypt.compare(password, user.password);

    if(passwordCompare) {
        const jwtToken = await jwt.sign({ user:user }, process.env.SECRETKEY);
        
        if(jwtToken) {
            const cookie = req.cookies.jwtToken;
            
            if(!cookie) {
                res.cookie("jwtToken", jwtToken, { maxAge: 3600000, httpOnly: true });
            }
            
            return res.redirect("/");
        }
    }
    res.send("Try again");
});

router.get("/logout", (req, res) => {
    res.clearCookie("jwtToken").send("Logged out. Cookies cleared.");
});

module.exports = router;