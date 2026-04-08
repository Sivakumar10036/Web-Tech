const express = require("express");
const router = express.Router();

const { getUsersList, deleteUser } = require("../controllers/userController");

router.get("/", getUsersList);
router.delete("/:id", deleteUser);

module.exports = router;