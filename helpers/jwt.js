const jwt  = require("jsonwebtoken")
const secret = "AYYYYYLMAO"

function signToken(payload){
    return jwt.sign(payload, secret)
}

function verifyToken(payload){
    return jwt.verify(payload, secret)
}

module.exports = {signToken,verifyToken}