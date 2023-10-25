const express = require("express");
const UserController = require("../controllers/usersController");
const FarmController = require('../controllers/farmController');
const PeriodController = require("../controllers/periodController");
const authentication = require("../middleware/authentication");
const router = express.Router();


router.post("/users/registerAdmin", UserController.registerAdmin);
router.post("/users/registerABK", UserController.registerABK);
router.post("/users/login", UserController.login);
router.use(authentication)
router.get('/users/allAbk',UserController.getAllAbk)
router.post('/farms',FarmController.createFarm)
router.get('/farms',FarmController.getFarmByUserId)
router.post('/farms/:farmId/periods',PeriodController.addPeriod)
router.put('/periods/:periodId',PeriodController.editPeriod)
router.delete('/periods/:periodId',PeriodController.deletePeriod)
router.get('/periods/:periodId',PeriodController.getPeriodById)
router.put('/periods/:periodId',PeriodController.endPeriod)
router.get('farms/:farmId',FarmController.getFarmById)
router.put('farms/:farmId',FarmController.editFarm)
router.delete('farms/:farmId',FarmController.deleteFarm)



module.exports = router;
