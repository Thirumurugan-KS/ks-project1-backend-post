const express = require("express")
const { home , createUser, signIn } = require("../components/userComponent")



const router = express.Router()


router.route("/").get(home)
router.route("/create").get(createUser)
router.route("/signin").put(signIn)

module.exports = router