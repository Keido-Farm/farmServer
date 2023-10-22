const { Period, Farm, User } = require("../models");

class PeriodController {
  static async addPeriod(req, res, next) {
    try {
      const { startDate: inputStartDate, startingDOCNum: inputStartDOC } =
        req.body;
      const { farmId: inputFarmId } = req.params;

      const farm = await Farm.findByPk(inputFarmId);
      if (!farm) {
        return res.status(404).json({ message: "Farm not found" });
      }

      await Period.create({
        startDate: inputStartDate,
        startingDOCNum: inputStartDOC,
        FarmId: inputFarmId,
      });

      res.status(201).json({ message: "Period created successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async editPeriod(req, res, next) {
    try {
      const { periodId } = req.params;
      const { startDate, startingDOCNum, endDate } = req.body;
      const foundPeriod = await Period.findByPk(periodId);
      if (!foundPeriod) {
        throw { name: "InvalidPeriodId" };
      }
      await Period.update(
        {
          startDate,
          startingDOCNum,
          endDate,
        },
        {
          where: {
            id: periodId,
          },
        }
      );
      const updatedPeriod = await Period.findByPk(periodId);

      res.status(200).json({
        msg:'Period Updated Successfully',
        period:updatedPeriod
      })
    } catch (err) {
      next(err)
    }
  }
  static async deletePeriod(req, res, next) {
    try {
      const { periodId } = req.params;
      const foundPeriod = await Period.findByPk(periodId);
      if (!foundPeriod) {
        throw { name: "InvalidPeriodId" };
      }
      await Period.destroy({
        where: {
          id: periodId,
        },
      });
      res.status(204).json({
        msg: "Period Deleted Successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PeriodController;
