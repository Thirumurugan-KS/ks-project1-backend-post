const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name : String,
    gender : String,
    designation : String,
    city : String
})

module.exports = mongoose.model("employee", employeeSchema)