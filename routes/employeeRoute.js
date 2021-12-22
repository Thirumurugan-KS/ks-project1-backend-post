const express = require("express")
const router = express.Router()
const { isLogin } = require("../middlewares/userMiddleware")

const { createEmployee , updateEmployee, deleteEmployee, employeeGet, createEmployeeTable} = require("../components/employeeComponent")

router.route("/employee").get(isLogin,employeeGet)
router.route("/employee/update/:id").post(isLogin,updateEmployee)
router.route("/employee/delete/:id").delete(isLogin,deleteEmployee)
router.route("/employee/add").put(isLogin,createEmployee)
router.route("/employeetable").get(isLogin,createEmployeeTable)


module.exports = router