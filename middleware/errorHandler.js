const errorHandler = (err,req,res,next) => {
  let status = 500;
  let message ='Internal Server Error'

  if (err.name === 'unauthenticated'|| err.name === 'JsonWebTokenError'){
    status = 401
    message = 'Invalid Token please re-login'
  }
  res.status(status).json({message:message})
};
module.exports = errorHandler