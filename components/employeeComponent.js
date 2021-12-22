const express = require("express")
const pool = require("../Config/postConfig")
const asyncHandler = require('express-async-handler')

//put request
//returns user 

exports.createEmployeeTable =  async(req,res)=>{


    const temp = await pool.query(`CREATE TABLE employees(name VARCHAR(10),gender VARCHAR(10),designation VARCHAR(10),city VARCHAR(10));`)


res.json({
    "success" : "true"
})

}

exports.createEmployee =  asyncHandler(async(req,res)=>{
    try{
     const { name , gender , designation , city } = req.body
     const data = await pool.query(`INSERT INTO employees (name,gender,designation,city) VALUES ('${name}','${gender}','${designation}','${city}') RETURNING *`)
     console.log(data)
     const employee = data.rows[0]
     res.json(employee)
    }
    catch(error){
 
     throw new Error(error.message)
     return
 
 }
 })

//post request
//return user

exports.updateEmployee =  asyncHandler(async(req,res)=>{

    try{

        const id = req.params.id
        const { name , gender , designation , city } = req.body
        const employee = await pool.query(`UPDATE employees 
        SET name = '${name}', gender = '${gender}', designation = '${designation}', city = '${city}'
        WHERE id='${id}' 
        RETURNING *`)
        res.json(employee.rows[0])

    }
    catch(error){
        throw new Error(error.message)
           return
    }


 }
)
//delete request
//return status

exports.deleteEmployee = asyncHandler(async(req,res)=>{

    try{

        const id = req.params.id
        const employee = await pool.query(`DELETE from employees WHERE id='${id}'`)
        res.json({
            "Status" : "ok"
        })

    }
    catch(error){
        throw new Error(error.message)
        return
    }


 })


 //get request
 //return users

 exports.employeeGet =  asyncHandler(async(req,res)=>{

    try{

        const employee = await pool.query('SELECT * FROM employees')
        res.json(employee.rows)
    }
    catch(error){
        throw new Error(error.message)
        return
    }


 })


