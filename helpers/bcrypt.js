const bcrypt = require('bcrypt')

function hashPassword(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

function passComp(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {hashPassword, passComp}