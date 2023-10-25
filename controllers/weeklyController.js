const {dailyReport,weeklyReport} = require("../models")

class weeklyReportController {
  static async getWeeklyReportById(req,res,next){
    try {
      const {weeklyReportId} = req.params;
      const details = await weeklyReport.findByPk(weeklyReportId);
      if (!details){
        throw {name : 'InvalidWeekReportId'}
      }
      const dailyReports = await dailyReport.findAll({
        where:{
          WeeklyReportId: weeklyReportId
        }
      });
      res.status(200).json({
        details: details,
        dailyReports: dailyReports
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = weeklyReportController