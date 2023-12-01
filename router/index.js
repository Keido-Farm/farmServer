const express = require("express");
const UserController = require("../controllers/usersController");
const FarmController = require('../controllers/farmController');
const PeriodController = require("../controllers/periodController");
const authentication = require("../middleware/authentication");
const DailyReportController = require("../controllers/dailyController");
const weeklyReportController = require("../controllers/weeklyController");
const router = express.Router();


router.post("/users/registerAdmin", UserController.registerAdmin);
router.post("/users/registerABK", UserController.registerABK);
router.post("/users/login", UserController.login);
router.use(authentication)
router.get('/users/allAbk',UserController.getAllAbk)
router.post('/daily',DailyReportController.postDailyReport)
router.post('/farms',FarmController.createFarm)
router.get('/farms',FarmController.getFarmByUserId)
router.get('/farmsABK',FarmController.getFarmsForABK)
router.get('/weekly/:weeklyId',weeklyReportController.ArchiveWeeklyReportById)
// router.put('/weekly/:weeklyId',weeklyReportController.ArchiveWeeklyReportById)
router.put('/daily/:dailyId',DailyReportController.editDailyReport)
router.delete('/daily/:dailyId',DailyReportController.deleteDailyReport)
router.get('/daily/:dailyId',DailyReportController.getDailyReportById)
router.put('/farms/:farmId',FarmController.editFarm)
router.delete('/farms/:farmId',FarmController.deleteFarm)
router.get('/farms/:farmId',FarmController.getFarmById)
router.post('/farms/:farmId/periods',PeriodController.addPeriod)
router.put('/periods/:periodId',PeriodController.editPeriod)
router.delete('/periods/:periodId',PeriodController.deletePeriod)
router.get('/periods/:periodId',PeriodController.getPeriodById)
router.put('/periods/:periodId',PeriodController.endPeriod)





module.exports = router;
