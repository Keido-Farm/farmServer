const express = require("express");
const users = require("./users");
const UserController = require("../controllers/usersController");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get('/',(req,res) => {
  res.send('ini terhit')
})



module.exports = router;
