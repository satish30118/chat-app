const express = require("express");
const Login = require("../Controller/login");
const Register = require("../Controller/register");
const allUsers = require("../Controller/allUsers");
const authenticate = require("../Middleware/authenticate");
const router = express.Router();

router.route("/login").post(Login);
router.route("/register").post(Register);
router.route("/").get(authenticate,allUsers);

module.exports = router;
