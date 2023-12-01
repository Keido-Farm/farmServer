const { dailyReport, weeklyReport, Period } = require("../models");

class DailyReportController {
  static async postDailyReport(req, res, next) {
    try {
      const {
        FarmId,
        recordDate,
        mati,
        afkir,
        diberikan,
        dikonsumsi,
        tindakan,
      } = req.body;

      const mostRecentPeriod = await Period.findOne({
        where: { FarmId: FarmId },
        order: [["startDate", "DESC"]],
      });

      if (!mostRecentPeriod) {
        return res
          .status(404)
          .json({ message: "No period found for the given Farm" });
      }

      const mostRecentWeeklyReport = await weeklyReport.findOne({
        where: { PeriodId: mostRecentPeriod.id },
        order: [["startingDate", "DESC"]],
      });

      if (!mostRecentWeeklyReport) {
        return res
          .status(404)
          .json({ message: "No weekly report found for the given Farm" });
      } else if (mostRecentWeeklyReport) {
        const mostRecentDailyReport = await dailyReport.findOne({
          where: { WeeklyReportId: mostRecentWeeklyReport.id },
          order: [["recordDate", "DESC"]],
        });
        if (!mostRecentDailyReport) {
          await dailyReport.create({
            FarmId,
            recordDate,
            mati,
            afkir,
            hidup: mostRecentWeeklyReport.jumlahAyamAwal - (Number(mati) + (afkir)),
            diberikan,
            sisa: diberikan - dikonsumsi,
            dikonsumsi,
            tindakan,
            WeeklyReportId: mostRecentWeeklyReport.id,
            UserId: req.user.id,
          });
          res.status(201).json({
            message: `Daily report submitted for Farm ${FarmId}`
          })
        } else if (mostRecentDailyReport) {
          await dailyReport.create({
            FarmId,
            recordDate,
            mati,
            afkir,
            hidup: mostRecentDailyReport.hidup - (Number(mati) + Number(afkir)),
            diberikan,
            sisa: diberikan - dikonsumsi,
            dikonsumsi,
            tindakan,
            WeeklyReportId: mostRecentWeeklyReport.id,
            UserId: req.user.id,
          });
          console.log(mostRecentDailyReport.hidup,(Number(mati) + Number(afkir)));
          res.status(201).json({
            message: `Daily report submitted for Farm ${FarmId}`
          })
        }
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async editDailyReport(req, res, next) {
    try {
      const { dailyId } = req.params;
      const { recordDate, mati, afkir, hidup, diberikan, tindakan } = req.body;

      const foundDailyReport = await dailyReport.findByPk(dailyId);
      if (!foundDailyReport) {
        throw { name: "InvalidDailyReportId" };
      }

      await foundDailyReport.update({
        recordDate,
        mati,
        afkir,
        hidup,
        diberikan,
        tindakan,
      });

      res.status(200).json({
        msg: "Daily report updated successfully",
        daily: foundDailyReport,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteDailyReport(req, res, next) {
    try {
      const { dailyId } = req.params;
      const foundDailyReport = await dailyReport.findByPk(dailyId);
      if (!foundDailyReport) {
        throw { name: "InvalidDailyReportId" };
      }
      await dailyReport.destroy({
        where: {
          id: dailyId,
        },
      });
      res.status(200).json({
        msg: "Daily Report Deleted",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getDailyReportById (req,res,next){
    try {
      const { dailyId } = req.params;
      const foundDailyReport = await dailyReport.findByPk(dailyId);
      if (!foundDailyReport) {
        throw { name: "InvalidDailyReportId" };
      }
      res.status(200).json({
        foundDailyReport
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = DailyReportController;
