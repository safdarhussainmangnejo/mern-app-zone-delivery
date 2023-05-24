const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get("/getUser", userController.getData);
router.post("/signup", userController.Signup);
router.post("/login", userController.Login);
router.post("/new-password", userController.NewPassword);
router.post("/reset-password", userController.ResetPassword);
module.exports = router;