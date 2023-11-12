const { dailyReport, weeklyReport } = require("../models");

class weeklyReportController {
  static async ArchiveWeeklyReportById(req, res, next) {
    try {
      const { weeklyId } = req.params;
      const details = await weeklyReport.findByPk(weeklyId);
      if (!details) {
        throw { name: "InvalidWeekReportId" };
      }
      const dailyReports = await dailyReport.findAll({
        where: {
          WeeklyReportId: weeklyId,
        },
      });
      const dailyReportsArray = dailyReports.map((report) => report.toJSON());
      if (dailyReportsArray.length < 7) {
        throw { name: `DailyReportsLess` };
      }
      if (dailyReports.length > 7) {
        throw { name: 'DailyReportsMore' }
      }
      
      let totalPakanPerMinggu = 0;
      let totalKematianPerMinggu = 0;
      let totalKematianDeplesi = 0;
      const jumlahAyamAwal = details.toJSON().jumlahAyamAwal;
      for (const dailyReport of dailyReportsArray) {
        totalPakanPerMinggu += dailyReport.dikonsumsi;
        totalKematianPerMinggu += dailyReport.mati;
        totalKematianDeplesi += dailyReport.mati + dailyReport.afkir;
      }
      const feedIntakeMingguan = (totalPakanPerMinggu * 1000) / jumlahAyamAwal * 7;
      const mortalitas = (totalKematianPerMinggu / jumlahAyamAwal) * 100;
      const deplesi = (totalKematianDeplesi / jumlahAyamAwal) * 100;
  
      await details.update({
        feedIntake: feedIntakeMingguan,
        mortalitas,
        deplesi,
      });
  
      res.status(200).json({
        msg: 'Weekly Report Summarized and Archived',
        updatedReport: details,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  
  
}

module.exports = weeklyReportController;
