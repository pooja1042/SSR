const express = require('express')
const Routes = express.Router()

const  { AppointmentTB } = require('../models')
const { Op } = require('sequelize')

// -----> INSERT TO 'AppointmentTB'
Routes.post('/Insert', async(req,res) => {
  try{
    const dataS = req.body
    await AppointmentTB.create(dataS)
    res.json({result:"Appointment Added Successfully!!!"})
  }catch(error){
    res.json({error:error.message})
  }
})

// -----> FETCH ONE RECORD FOR GIVEN DATE AND TIME TO CHECK FOR DUPLICATE SLOT
Routes.get('/FetchOneForSlot/:slotDate/:slotTime', async(req,res) => {
  try{
    const result = await AppointmentTB.findAll({
      where: 
        { 
          appointmentDate: req.params.slotDate,
          appointmentTime: req.params.slotTime
        } 
    })
    if(result.length > 0){
      res.json(true)
    }else res.json(false)
  }catch(error){
    res.json({error:error.message})
  }
})

// -----> FETCH RECORDS WHERE DATE IS TODAY AND TOMORROW
Routes.get('/FetchTodayTomorrow/:today/:tomorrow', async(req,res) => {
  try{
    const result = await AppointmentTB.findAll({
      where: 
        { 
          appointmentDate: {
            [Op.between]: [req.params.today, req.params.tomorrow]
          }          
        } 
    })
    if(result.length > 0){
      res.json(result)
    }else res.json({result:"No Such Appointments..."})
  }catch(error){
    res.json({error:error.message})
  }
})

// -----> FETCH ONE RECORD FOR UPDATE
Routes.get('/FetchOne/:id', async(req,res) => {
  try{
    const result = await AppointmentTB.findAll({where: { id:req.params.id } })
    if(result.length > 0){
      res.json(result)
    }else res.json({result:"No Appointments..."})
  }catch(error){
    res.json({error:error.message})
  }
})

// -----> UPDATE RECORD BY ID
Routes.patch('/UpdateOne/:id', async(req,res) => {
  try{
    const result = await AppointmentTB.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        status: req.body.status,
        address:req.body.address,
        city: req.body.city,
        pincode: req.body.pincode,
        contact: req.body.contact,
        mail: req.body.mail,
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
        guardianName: req.body.guardianName,
        guardianRelation: req.body.guardianRelation,
        guardianContact: req.body.guardianContact,
        payment: req.body.paymentMode,
        doctorName: req.body.doctorName,
        symptoms: req.body.symptoms       
      },
      {
        where: { id: req.params.id } 
      })
      res.json(result[0])    
  }catch(error){
    res.json({error:error.message})
  }
})

// -----> DELETE ONE RECORD BY ID
Routes.delete('/DeleteOne/:id', async(req,res) => {
  try{
    const result = await AppointmentTB.destroy({where: { id:req.params.id } })
    res.json(result)    
  }catch(error){
    res.json({error:error.message})
  }
})

module.exports = Routes