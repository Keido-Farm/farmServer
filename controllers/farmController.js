const { Farm,User } = require("../models");

class FarmController {
  static async createFarm(req, res, next) {
    try {
      const {
        name: inputName,
        category: inputCategory,
        location: inputLocation,
        abk: inputAbk,
        strain: inputStrain,
        imgUrl: inputImgUrl,
      } = req.body;
      const data = await Farm.create({
        name: inputName,
        category: inputCategory,
        location: inputLocation,
        abk: inputAbk,
        strain: inputStrain,
        imgUrl: inputImgUrl,
        UserId: req.user.id,
      });
      res.status(201).json({
        msg: "Farm Created",
        farm: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getFarmByUserId(req, res, next) {
    try {
      const data = await Farm.findAll({
        where: {
          UserId: req.user.id,
        },
        include: [
          {
            model: User,
            attributes: { exclude: ['password'] },
          },
        ],
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  
  
}

module.exports = FarmController;
