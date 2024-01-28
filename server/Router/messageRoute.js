const express= require("express");
const authenticate = require("../Middleware/authenticate");
const { sendMessage, getAllMessages } = require("../Controller/message");
const router = express.Router();

router.route("/").post(authenticate,sendMessage)
router.route("/:chatId").get(authenticate,getAllMessages)


module.exports = router;