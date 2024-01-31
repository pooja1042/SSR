import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const appointmentSlice = createSlice({
  name:"appointment",
  initialState: {
    appointmentsData: []
  },
  reducers:{

    addAppointment: (state, action) => {      
      axios.post('http://localhost:3030/Insert',action.payload.values)
        .then( (d) => {          
          alert("Appointment Added Successfully!!!")
          return d
      })
    },

    getTodayTomorrowAppointments: (state,action) => {
      return action.payload
    },        

    getOneAppointment: (state, action) => {
      return action.payload
    },

    getOneAppointmentUpdate: (state, action) => {      
      axios.patch(`http://localhost:3030/UpdateOne/${action.payload.updatingValues.id}`,action.payload.updatingValues)
        .then( (d) => {
          if(d.data === 1)
          {
            alert("Appointment Updated!!!")
          }else alert("Somthing Went Wrong!!!")         
          return d
      })
    },

    deleteOneAppointment: (state, action) => {     
      axios.delete(`http://localhost:3030/DeleteOne/${action.payload.deletingId.id}`)
        .then( (d) => {
          if(d.data === 1)
          {
            alert("Appointment Deleted!!!")
          }else alert("Somthing Went Wrong!!!")         
          return d 
        })
    }
  }
})

export const { addAppointment, getTodayTomorrowAppointments, getOneAppointment, getOneAppointmentUpdate, deleteOneAppointment } = appointmentSlice.actions
export default appointmentSlice.reducer