const express = require("express")
const Employee = require("../models/employeeModel")
const asyncHandler = require('express-async-handler')

//put request
//returns user 

exports.createEmployee =  asyncHandler(async(req,res)=>{
    try{
     const { name , gender , designation , city } = req.body
     const employee = await Employee.create({
         "name" : name,
         "gender" : gender,
         "designation" : designation,
         "city" : city
     })  
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
        const employee = await Employee.findById(id)
        employee.name = name
        employee.gender = gender
        employee.designation = designation
        employee.city = city
        await employee.save()
        res.json(employee)

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
        const employee = await Employee.findById(id)
        await employee.remove()
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

        const employee = await Employee.find({})
        res.json(employee)
    }
    catch(error){
        throw new Error(error.message)
        return
    }


 })


