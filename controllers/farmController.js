const { Farm,User,Period } = require("../models");

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

  static async getFarmById(req,red,next){
    try {
      const {farmId} = req.params
      const details = await Farm.findByPk({
        farmId
      })
      if(!details){
        throw {name:'InvalidFarmId'}
      }
      const periods = await Period.findAll({
        where: {
          FarmId: farmId
        }
      })
      res.status(200).json({
        details:details,
        periods:periods
      })
    } catch (err) {
      next(err)
    }
  }
  static async deleteFarm(req,res,next){
    const {farmId} = req.params;
    const foundFarm = await Farm.findByPk(farmId);
    if(!foundFarm){
      throw{name:'InvalidFarmId'}
    }
    await Farm.destroy({
      where:{
        id: farmId
      }
    })
    res.status(204).json({
      msg:'Farm Deleted Successfully'
    })
  }

  static async editFarm(req, res, next) {
    const { farmId } = req.params;
    const { name, category, location, abk, strain, imgUrl } = req.body;
  
    try {
      const foundFarm = await Farm.findByPk(farmId);
      if (!foundFarm) {
        throw { name: 'InvalidFarmId' };
      }
      await Farm.update(
        {
          name,
          category,
          location,
          abk,
          strain,
          imgUrl,
        },
        {
          where: {
            id: farmId,
          },
        }
      );
      const updatedFarm = await Farm.findByPk(farmId);
  
      res.status(200).json({
        msg: 'Farm Updated Successfully',
        farm: updatedFarm,
      });
    } catch (err) {
      next(err);
    }
  }
  
}

module.exports = FarmController;
