const { dailyReport, weeklyReport, sequelize } = require("../models");

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
      let totalPakanPerMinggu = 0;
      let totalKematianPerMinggu = 0;
      let totalKematianDeplesi = 0;
      const jumlahAyamAwal = details.toJSON().jumlahAyamAwal;
      for (const dailyReport of dailyReportsArray) {
        totalPakanPerMinggu += dailyReport.dikonsumsi;
        totalKematianPerMinggu += dailyReport.mati;
        totalKematianDeplesi += dailyReport.mati + dailyReport.afkir;
      }
      const feedIntakeMingguan =
        ((totalPakanPerMinggu * 1000) / jumlahAyamAwal) * 7;
      const mortalitas = (totalKematianPerMinggu / jumlahAyamAwal) * 100;
      const deplesi = (totalKematianDeplesi / jumlahAyamAwal) * 100;

      await details.update({
        feedIntake: feedIntakeMingguan,
        mortalitas,
        deplesi,
      });

      res.status(200).json({
        msg: "Weekly Report Summarized and Archived",
        updatedReport: details,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async CalculateBB(req, res, next) {
    try {
      const { weeklyId } = req.params;
      const { avgBB, jumlahBBStd, jumlahAyam } = req.body;
      const foundWeek = await weeklyReport.findByPk(weeklyId);
      if (!foundWeek) {
        throw { name: "InvalidWeekReportId" };
      }
      const ksrgmnBB = (jumlahBBStd / jumlahAyam) * 100;
      await foundWeek.update({
        beratBadan: avgBB,
        ksrgmnBB: ksrgmnBB,
      });
      res.status(200).json({
        msg: "BB recorded",
        updatedReport: foundWeek,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async GetDailyReport(req, res, next) {
    try {
      const { weeklyId } = req.params;
      const dailyReports = await dailyReport.findAll({
        where: {
          WeeklyReportId: weeklyId,
        },
      });
      if (!dailyReports) {
        throw { name: "InvalidWeekReportId" };
      }
      res.status(200).json({
        dailyReports,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = weeklyReportController;
