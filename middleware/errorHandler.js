const errorHandler = (err,req,res,next) => {
  let status = 500;
  let message ='Internal Server Error'

  if (err.name === 'unauthenticated'|| err.name === 'JsonWebTokenError'){
    status = 401
    message = 'Invalid Token please re-login'
  } else if (err.name === 'InvalidFarmId'){
    status = 404
    message = 'Invalid Farm Id'
  } else if (err.name === 'InvalidPeriodId'){
    status = 404
    message = 'Invalid Period Id'
  } else if (err.name === 'InvalidWeekReportId'){
    status = 404
    message = 'Invalid Weekly Report Id'
  }
  res.status(status).json({message:message})
};
module.exports = errorHandler