const express = require("express");
const UserController = require("../controllers/usersController");
const FarmController = require('../controllers/farmController');
const authentication = require("../middleware/authentication");
const router = express.Router();


router.post("/registerAdmin", UserController.registerAdmin);
router.post("/registerABK", UserController.registerABK);
router.post("/login", UserController.login);
router.use(authentication)
router.get('/allAbk',UserController.getAllAbk)
router.post('/farm',FarmController.createFarm)
router.get('/farm',FarmController.getFarmByUserId)




module.exports = router;
