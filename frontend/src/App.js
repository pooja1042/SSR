import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './Components/Common/Navigation';
import { Home } from './Components/Views/Home';
import Appointment from './Components/Views/Appointment';
import { ViewAppointment } from './Components/Views/ViewAppointments';
import { UpdateAppointment } from './Components/Views/UpdateAppointment';
import React from 'react';

function App() {
  return (
    <div className="App">      
      <Navigation />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Appointment' element={<Appointment/>}></Route>
        <Route path='/viewAppointment' element={<ViewAppointment/>}></Route>
        <Route path='/updateAppointment/:id' element={<UpdateAppointment/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
