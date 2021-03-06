const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwtToken;
    
    if(!token) return res.render("You're not authenticated.");

    const verified = jwt.verify(token, process.env.SECRETKEY);
    console.log(verified);
    req.header = verified;

    next();
}

module.exports = verifyToken;