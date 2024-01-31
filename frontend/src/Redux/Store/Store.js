import { configureStore } from '@reduxjs/toolkit'
import AppointmentReducer from '../AppointmentReducer'

const store = configureStore({
  reducer: {
    appointment: AppointmentReducer
  }
})

export default store