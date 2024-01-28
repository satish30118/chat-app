const express = require("express");
const { accessChat,fetchChat,createGroupChat,renameGroup,addToGroup,removeFromGroup} = require("../Controller/chat");

const authenticate = require("../Middleware/authenticate");

const router = express.Router();

router.route("/").post(authenticate,accessChat);
router.route("/").get(authenticate,fetchChat);
router.route("/group").post(authenticate,createGroupChat);
router.route("/rename-group").put(authenticate,renameGroup);
router.route("/groupremove").put(authenticate,removeFromGroup);
router.route("/groupadd").put(authenticate,addToGroup);


module.exports = router;