const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get("/getUser", userController.getData);
router.post("/signup", userController.Signup);
router.post("/login", userController.Login);

module.exports = router;