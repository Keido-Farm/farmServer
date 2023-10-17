const {verifyToken} = require ('../helpers/jwt')
const{User} = require('../models')

async function authentication (req,res,next) {
  //check if client sent headers access_token
  try {
    const{access_token} = req.headers;
    if(!access_token) {
      throw {name:'unauthenticated'}
    }

    //2. Decode the access token
    const payload = verifyToken(access_token) 

    //3.check if user is in database
    const findUser = await User.findByPk(payload.id)
    if(!findUser) {
      throw {name:'unauthenticated'}
    }

    req.user = {
      id:findUser.id,
      name:findUser.name,
      role:findUser.role
    }

    next();
  } catch (error) {

    next(error)
  }

  
}

module.exports = authentication