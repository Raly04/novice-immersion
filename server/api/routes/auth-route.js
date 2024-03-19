/** @format */

const router = require("express").Router();
const { login, register, utilisateur } = require("../controllers/auth-controller");

router.post("/login", login);
router.post("/register", register);
router.post("/user/:id",utilisateur)

module.exports = router;
