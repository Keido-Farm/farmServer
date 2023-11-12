const { passComp } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async registerAdmin(req, res, next) {
    try {
      const {
        name: inputName,
        username: inputUsername,
        email: inputEmail,
        password: inputPasword,
      } = req.body;

      await User.create({
        name: inputName,
        username: inputUsername,
        email: inputEmail,
        password: inputPasword,
        role: "admin",
      });

      res.status(201).json({
        msg: "Admin successfuly created",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async registerABK(req, res, next) {
    try {
      const {
        name: inputName,
        username: inputUsername,
        email: inputEmail,
        password: inputPasword,
      } = req.body;

      await User.create({
        name: inputName,
        username: inputUsername,
        email: inputEmail,
        password: inputPasword,
        role: "abk",
      });

      res.status(201).json({
        msg: "ABK successfuly created",
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "NoEmail" };
      }
      if (!password) {
        throw { name: "NoPassword" };
      }

      const foundUser = await User.findOne({ where: { email: email } });
      if (foundUser) {
        const comparePassword = passComp(password, foundUser.password);
        if (comparePassword) {
          const token = signToken({ id: foundUser.id });
          const role = foundUser.role
          res.status(200).json({
            access_token: token,
            role: role
          });
        } else {
          throw { name: "InvalidUser" };
        }
      } else {
        throw { name: "InvalidUser" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async getAllAbk(req, res, next) {
    try {
      const abkUsers = await User.findAll({
        where: {
          role: "abk",
        },
        attributes: { exclude: ["password"] },
      });

      res.status(200).json(abkUsers);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
