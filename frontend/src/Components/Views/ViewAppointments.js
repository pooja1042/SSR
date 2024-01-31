import React, { useEffect } from 'react'
import axios from 'axios'
import { Layout, Button, theme, Card  } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getTodayTomorrowAppointments, deleteOneAppointment } from '../../Redux/AppointmentReducer'
import '../Style/style.css'


export const ViewAppointment = () => {

  const { Content } = Layout;
  const Dispatch = useDispatch()
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const setAppointment = useSelector( (state) => state.appointment) 
  // GET TODAY AND TOMORROW DATE IN ISO FORMAT
  const now = new Date();
  const todayformattedDate = now.toISOString().split('T')[0] + 'T00:00:00.000Z';
  let tomorrowformattedDate = new Date();
  tomorrowformattedDate.setDate(now.getDate() + 1); 
  tomorrowformattedDate = tomorrowformattedDate.toISOString().split('T')[0] + 'T00:00:00.000Z';

  useEffect( () => {   
    fetchTodayTomorrowAppointments()
  })
  
  // ---------------------------------------- UDF ---------------------------------------------

  // GET TODAY AND TOMORROW APPOINTMENTS
  const fetchTodayTomorrowAppointments = async () => {
    try{      
      const result = await axios.get(`http://localhost:3030/FetchTodayTomorrow/${todayformattedDate}/${tomorrowformattedDate}`)
      const resultData = result.data
      Dispatch(getTodayTomorrowAppointments(resultData))     
    }catch(error){     
      alert("Somthing Went Wrong!!!")
    }
  }

  // TO DELET APPOINTMENT BY ID
  const deleteAppointment = (datas) => {   
    const deletingId = {
      id: datas.id
    }
    Dispatch(deleteOneAppointment( {deletingId} ))    
  }

  return (
    <>     
      <Content style={{ 
        padding: '0 48px',
        backgroundColor: '',       
      }}>       
        <div
          style={{
            padding: 24,
            minHeight: 380,            
            borderRadius: borderRadiusLG,
          }}
        >
          <div className='container'>
            <div className='row'>
              <div className='col'>
              <h5 className='fw-bold border-bottom border-black my-4 formTitles'>Today's Appointments</h5>
                <div className=''>
                  {
                    setAppointment.length > 0
                    ? setAppointment.map( (d,key) => {

                      const dateStringFromDatabase = d.appointmentDate;               
                      const dateObject = new Date(dateStringFromDatabase);               
                      const formattedDate = dateObject.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      });                    
                      
                      if(d.appointmentDate === todayformattedDate){
                        return(                        
                          <>
                            <Card
                              key={key}                            
                              bordered={false}
                              className='border border-dark-subtle shadow rounded appointmentReceipt mt-4'
                              style={{
                                width: 400,                                                                                    
                              }}
                            >
                              <div className='row border-bottom border-danger shadow'>
                                <div className='col-2'>
                                  <img src='./images/logo.webp' alt='LOGO' className='logoImg' style={{height: '60px', borderRadius: '100px', marginBottom: '3px'}}/>
                                </div>
                                <div className='col'>
                                  <h5 className='webName'>Careme Health</h5>
                                  <span className='appointmentReceiptDateTime'> {formattedDate} </span> /
                                  <span className='appointmentReceiptDateTime'> {d.appointmentTime} </span>                                
                                </div>
                              </div>
                              <div className='row mt-4' style={{ textAlign: "left"}}>
                                <h6 className='border-bottom border-dark-subtle fw-bold '>Patient Details</h6>
                                <div className='col'>
                                  <h6> <b>Name:</b> {d.firstName} {d.lastName} </h6>
                                  <h6> <b>Age:</b> {d.age} </h6>
                                  <h6> <b>Gender:</b> {d.gender} </h6>                                
                                  <h6> <b>Contact:</b> {d.contact} </h6>                                
                                  <h6> <b>Address:</b> {d.address}, {d.city}, {d.pincode} </h6>                                
                                </div>
                              </div>
                              <div className='row mt-4' style={{ textAlign: "left"}}>
                                <h6 className='border-bottom border-dark-subtle fw-bold'>Medical Details</h6>
                                <div className='col'>
                                  <h6> <b>Symptoms:</b> {d.symptoms} </h6>                                                             
                                  <h6> <b>Doctor:</b> Dr. {d.doctorName} </h6>                                                             
                                </div>
                              </div>
                              <div className='row mt-4' style={{ textAlign: "left"}}>
                                <h6 className='border-bottom border-dark-subtle fw-bold'>Guardian Details</h6>
                                <div className='col'>
                                  <h6> <b>Name:</b> {d.guardianName} </h6>                                                             
                                  <h6> <b>Contact:</b> {d.guardianContact} </h6>                                                             
                                </div>
                              </div>
                              <div className='row mt-4' style={{ textAlign: "left"}}>
                                <h6 className='border-bottom border-dark-subtle fw-bold'>Payment Details</h6>
                                <div className='col'>                                                                                            
                                  <h6> <b>Payment:</b> {d.payment} </h6>                                                             
                                </div>
                              </div>
                              <div className='row mt-4' style={{ textAlign: "center"}}>                              
                                <div className='col'>
                                  <Button type="link" href={`/updateAppointment/${d.id}`} shape="round" icon={<EditOutlined />} />
                                  <Button onClick={() => deleteAppointment(d)} shape="round" icon={<DeleteOutlined />} />                             
                                </div>
                              </div>
                            </Card>
                          </>
                        )
                      }                   
                    })
                    : <h6 className='fw-bold text-danger rounded noAppointmentTitle'>No Appointment!!!</h6>
                  }   
                </div>                            
              </div>
              <div className='col'>
              <h5 className='fw-bold border-bottom border-black my-4 formTitles'>Tomorrow's Appointments</h5>
                <div>
                  {
                    setAppointment.length > 0
                    ? setAppointment.map( (d,key) => {

                      const dateStringFromDatabase = d.appointmentDate;               
                      const dateObject = new Date(dateStringFromDatabase);               
                      const formattedDate = dateObject.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      });
                      
                      if(d.appointmentDate === tomorrowformattedDate){
                        return(                              
                          <>
                            <Card
                              key={key}
                              bordered={false}
                              className='border border-dark-subtle shadow rounded appointmentReceipt mt-4'
                              style={{
                                width: 400,                                                                                    
                              }}
                            >
                              <div className='row border-bottom border-danger shadow'>
                                <div className='col-2'>
                                  <img src='./images/logo.webp' alt='LOGO' className='logoImg' style={{height: '60px', borderRadius: '100px', marginBottom: '3px'}}/>
                                </div>
                                <div className='col'>
                                  <h5 className='webName'>Careme Health</h5>
                                  <span className='appointmentReceiptDateTime'> {formattedDate} </span> /
                                  <span className='appointmentReceiptDateTime'> {d.appointmentTime} </span>                                
                                </div>
                              </div>
                              <div className='row mt-4' style={{ textAlign: "left"}}>
                                <h6 className='border-bottom border-dark-subtle fw-bold '>Patient Details</h6>
                                <div className='col'>
                                  <h6> <b>Name:</b> {d.firstName} {d.lastName} </h6>
                                  <h6> <b>Age:</b> {d.age} </h6>
                                  <h6> <b>Gender:</b> {d.gender} </h6>                                
                                  <h6> <b>Contact:</b> {d.contact} </h6>                                
                                  <h6> <b>Address:</b> {d.address}, {d.city}, {d.pincode} </h6>                                
                                </div>
                              </div>
                              <div className='row mt-4' style={{ textAlign: "left"}}>
                                <h6 className='border-bottom border-dark-subtle fw-bold'>Medical Details</h6>
                                <div className='col'>
                                  <h6> <b>Symptoms:</b> {d.symptoms} </h6>                                                             
                                  <h6> <b>Doctor:</b> Dr.{d.doctorName} </h6>                                                             
                                </div>
                              </div>
                              <div className='row mt-4' style={{ textAlign: "left"}}>
                                <h6 className='border-bottom border-dark-subtle fw-bold'>Guardian Details</h6>
                                <div className='col'>
                                  <h6> <b>Name:</b> {d.guardianName} </h6>                                                             
                                  <h6> <b>Contact:</b> {d.guardianContact} </h6>                                                             
                                </div>                              
                              </div>  
                              <div className='row mt-4' style={{ textAlign: "left"}}>
                                <h6 className='border-bottom border-dark-subtle fw-bold'>Payment Details</h6>
                                <div className='col'>                                                                                            
                                  <h6> <b>Payment:</b> {d.payment} </h6>                                                             
                                </div>
                              </div>                          
                              <div className='row mt-4' style={{ textAlign: "center"}}>                              
                                <div className='col'>
                                  <Button type="link" href={`/updateAppointment/${d.id}`} shape="round" icon={<EditOutlined />} />
                                  <Button onClick={() => deleteAppointment(d)} shape="round" icon={<DeleteOutlined />} />                             
                                </div>
                              </div>
                            </Card>
                          </>              
                        )
                      }                    
                    })
                    : <h6 className='fw-bold text-danger rounded noAppointmentTitle'>No Appointment!!!</h6>
                  }    
                </div>            
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}
