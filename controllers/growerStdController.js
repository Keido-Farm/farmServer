const {GrowerStandard, sequelize} = require("../models")

class GrowerController {
  static async findGrowerStd(req, res, next) {
    try {
      const { umur,strain } = req.headers;
      const foundStd = await GrowerStandard.findOne({where:{umur,strain}}) 
      if (!foundStd) {
        throw { name: "InvalidStandard" };
      }
      res.status(200).json(foundStd)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = GrowerController