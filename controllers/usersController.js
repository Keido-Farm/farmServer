const { passComp } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {User} = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const {
        username: inputUsername,
        email: inputEmail,
        password: inputPasword,
        role: inputRole,
        phoneNumber: inputPhoneNumber,
        address: inputAddress,
      } = req.body;

      await User.create({
        username: inputUsername,
        email: inputEmail,
        password: inputPasword,
        role: inputRole,
        phoneNumber: inputPhoneNumber,
        address: inputAddress,
      });

      res.status(201).json({
        msg: "User successfuly created",
      });
    } catch (error) {
      next(error);
    }
  }
  static async login (req, res,next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({
          message: "Email is required",
        });
      }
      if (!password) {
        return res.status(400).json({
          message: "Password is required",
        });
      }
  
      const foundUser = await User.findOne({ where: { email: email } });
      if (foundUser) {
        const comparePassword = passComp(password, foundUser.password);
        if (comparePassword) {
          const token = signToken({ id: foundUser.id });
          res.status(200).json({
            access_token: token,
          });
        } else {
          return res.status(401).json({
            message: "Invalid email/password",
          });
        }
      } else {
        return res.status(401).json({
          message: "Invalid email/password",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = UserController;