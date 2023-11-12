const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  if (err.name === "unauthenticated" || err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid Token please re-login";
  } else if (err.name === "InvalidFarmId") {
    status = 404;
    message = "Invalid Farm Id";
  } else if (err.name === "InvalidPeriodId") {
    status = 404;
    message = "Invalid Period Id";
  } else if (err.name === "InvalidWeekReportId") {
    status = 404;
    message = "Invalid Weekly Report Id";
  } else if (err.name === "InvalidDailyReportId") {
    status = 404;
    message = "Invalid Daily Report Id";
  } else if (err.name === "DailyReportsLess") {
    status = 404;
    message = "Daily Reports less than 7 check reports back before finalizing";
  } else if (err.name === "DailyReportsMore") {
    status = 404;
    message = "Daily Reports more than 7 check reports back before finalizing";
  } else if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError"
  ) {
    status = 400;
    message = err.errors.map(
      (el) => el.message.charAt(0).toUpperCase() + el.message.slice(1)
    );
  } else if (err.name === 'NoEmail') {
    status = 401;
    message = 'Please enter Email'
  } else if (err.name === 'NoPassword'){
    status = 401;
    message = 'Please enter Password'
  } else if (err.name === 'InvalidUser'){
    status = 401;
    message = 'Invalid email/password'
  }
  res.status(status).json({ message: message });
};
module.exports = errorHandler;
