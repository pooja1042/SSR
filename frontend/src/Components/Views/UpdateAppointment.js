import React, { useEffect } from 'react'
import moment from 'moment';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ConfigProvider, Layout, Form, Input, Radio, Select, DatePicker, TimePicker, Button, theme } from 'antd';
import { getOneAppointment, getOneAppointmentUpdate } from '../../Redux/AppointmentReducer'
import '../Style/style.css'

export const UpdateAppointment = () => {

  const { id } = useParams()
  const { Content } = Layout;
  const { TextArea } = Input;
  const [ form ] = Form.useForm();
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const getOne = useSelector( (state) => state.appointment)  

  let dateFromDatePicker = getOne.appointmentDate; 
  let timeFromTimePicker = getOne.appointmentTime;     

    useEffect( () => {
    fetchOneAppointments()
  },[])

  // ------------------------------------- EVENTS --------------------------------------------

  const onFinish = (values) => {

  // FETCH DATE FROM DATEPICKER AND SAVE TO TABLE IN 'YYYY-MM-DD' FORMAT
    const dateString = values['appointmentDate'];               
    const dateObject = new Date(dateString);               
    let formattedDate = dateObject.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    const parts = formattedDate.split("/");
    const dateObjectCorrect = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);    
    formattedDate = dateObjectCorrect.toISOString().split('T')[0];   
    values['appointmentDate'] = formattedDate

  // FETCH TIME FROM TIMEPICKER AND SAVE TO TABLE IN 'HH:MM:SS' FORMAT
    let providedTime = values['appointmentTime']
    providedTime = moment();
    const formattedTime = providedTime.format('HH:mm:ss');    
    values['appointmentTime'] = formattedTime
    
    const updatingValues = {
      id: id,
      firstName: values.firstName,
      lastName: values.lastName,
      age: values.age,
      gender: values.gender,
      status: values.status,
      address: values.address,
      city: values.city,
      pincode: values.pincode,
      contact: values.contact,
      mail: values.mail,
      appointmentDate: values.appointmentDate,
      appointmentTime: values.appointmentTime,
      guardianName: values.guardianName,
      guardianRelation: values.guardianRelation,
      guardianContact: values.guardianContact,
      paymentMode: values.paymentMode,
      doctorName: values.doctorName,
      symptoms: values.symptoms,
      insurance: values.insurance,
      insuranceCompany: values.insuranceCompany,
      insuranceEffectiveDate: values.insuranceEffectiveDate
    }

    Dispatch(getOneAppointmentUpdate( {updatingValues} ))
    Navigate('/viewAppointment')    
  };

  const onFinishFailed = () => {    
    alert("Somthing Went Wrong...\nPlease Enter Valid Inputs...")
  };

  const onChangeDate = (date, dateString) => {
    dateFromDatePicker = dateString  
    isSlotExists()    
  };

  const onChangeTime = (time, timeString) => {
    timeFromTimePicker = timeString    
    isSlotExists()   
  };

  // ------------------------------------- UDF --------------------------------------------

  // TO FETCH ONW RECORD BY ID
  const fetchOneAppointments = async () => {
    try{
      const result = await axios.get(`http://localhost:3030/FetchOne/${id}`)
      const resultData = result.data      
      Dispatch(getOneAppointment(resultData[0]))
    }catch(error){     
      alert("Exception:\t",error)
    }
  }

  // TO CHECK IF GIVEN SLOT IS EXISS OR NOT
  const isSlotExists = async () => {
    if(dateFromDatePicker !== "" && timeFromTimePicker !== "")
    {
      const currentDate = new Date();

      const year = currentDate.getFullYear().toString();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const day = currentDate.getDate().toString().padStart(2, '0');
      const currentFormattedDate = `${year}-${month}-${day}`;     
      if(currentFormattedDate === dateFromDatePicker)
      {
        const isPast = isTimeInPast()
        if(isPast)
        {
          alert('You Can Not Choose Past Time!!!')
        }     
        else{
          // CHECK IN DATABASE IF SAME SLOT IS BOOKED OR NOT
          const dateObject = new Date(dateFromDatePicker);
          // Get the ISO string representation
          const isoDateString = dateObject.toISOString();          
          try{
            const isSlot = await axios.get(`http://localhost:3030/FetchOneForSlot/${isoDateString}/${timeFromTimePicker}`)           
            if(isSlot.data) alert('Given Time Is Already Booked!!!')
          }catch(error){
            alert("Somthing Went Wrong!!!")
          }
        }   
      }
      else
      {
        if(timeFromTimePicker !== "")
        {
          // CHECK IN DATABASE IF SAME SLOT IS BOOKED OR NOT
          const dateObject = new Date(dateFromDatePicker);
          // Get the ISO string representation
          const isoDateString = dateObject.toISOString();         
          try{
            const isSlot = await axios.get(`http://localhost:3030/FetchOneForSlot/${isoDateString}/${timeFromTimePicker}`)           
            if(isSlot.data){
              alert('Given Time Is Already Booked!!!')
            } 
          }catch(error){
            alert("Somthing Went Wrong!!!")
          }
        }    
      }
    }
  }

  // TO CHECK GIVEN TIME IS PAST OR NOT
  const isTimeInPast = () => {

    if(timeFromTimePicker !== "")
    {
      const currentDate = new Date();
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');

      const currentFormattedTime = `${hours}:${minutes}:${seconds}`;     

      return currentFormattedTime > timeFromTimePicker
    }
  }

  // TO DISABLE PAST DATES
  const disabledDate = (current) => {   
    return current && current < moment().startOf('day');
  };
  
  // SET DEFAULT VALUES TO INPUTS OF FORM
  form.setFieldsValue({ 
    firstName: getOne.firstName,
    lastName: getOne.lastName,
    age: getOne.age,
    gender: getOne.gender,
    status: getOne.status,
    address: getOne.address,
    city: getOne.city,
    pincode: getOne.pincode,
    contact: getOne.contact,
    mail: getOne.mail,
    appointmentDate: moment(getOne.appointmentDate),
    appointmentTime: moment(getOne.appointmentTime, 'HH:mm:ss'),
    guardianName: getOne.guardianName,
    guardianRelation: getOne.guardianRelation,
    guardianContact: getOne.guardianContact,
    payment: getOne.payment,
    doctorName: getOne.doctorName,
    symptoms: getOne.symptoms
   })

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
            backgroundColor: '',
            borderRadius: borderRadiusLG,
          }}
        >          
          <Form  
              name="basic" 
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <ConfigProvider theme={{ token: { fontFamily: 'Times New Roman', fontSize: '16px'},}}>
                <div className='row m-1'>
                  <h5 className='fw-bold border-bottom border-black my-4 formTitles'>Personal Details</h5>
                  <div className='col-6'>                                   
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter first name!',
                        },
                        {
                          pattern: /^[A-Za-z]+$/,
                          message: "First name should only contain alphabets!",
                        }, 
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className='col'>                                   
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please enter last name!",
                        },
                        {
                          pattern: /^[A-Za-z]+$/,
                          message: "Last name should only contain alphabets!",
                        },                    
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>
                <div className='row m-1'>
                  <div className='col'>                                   
                    <Form.Item
                      label="Age"
                      name="age"
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please enter age!",
                        },
                        {
                          pattern: /^[0-9]+$/,                     
                          message: "Age must be between 1 to 100!",
                        },                    
                      ]}
                    >
                      <Input maxLength={2} minLength={1} />
                    </Form.Item>
                  </div>
                  <div className='col-3'>                                  
                    <Form.Item                  
                      label="Gender"
                      name="gender" 
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please choose gender!",
                        },                                       
                      ]}                
                    >
                      <Radio.Group>
                        <Radio value="male"> Male </Radio>
                        <Radio value="female"> Female </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className='col'>                                   
                    <Form.Item 
                      label="Status" 
                      name="status" 
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please select status!",
                        },                                      
                      ]}
                    >
                      <Select>
                        <Select.Option value="Single">Single</Select.Option>
                        <Select.Option value="Married">Married</Select.Option>
                        <Select.Option value="Widowed">Widowed</Select.Option>
                        <Select.Option value="Divorced">Divorced</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className='row m-1'>
                  <div className='col'>                                      
                      <Form.Item 
                        label="Address" 
                        name="address" 
                        className='formLabel'
                        rules={[
                        {
                          required: true,
                          message: "Please enter address!",
                        },                                      
                      ]}
                      >
                        <TextArea rows={3} />
                      </Form.Item>
                  </div>
                  <div className='col'>                                      
                      <Form.Item
                      label="City"
                      name="city"
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please enter city!",
                        },
                        {
                          pattern: /^[A-Za-z]+$/,
                          message: "City should only contain alphabets!",
                        },                    
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className='col'>                                     
                      <Form.Item
                      label="Pincode"
                      name="pincode"
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please enter pincode!",
                        },
                        {
                          pattern: /^[0-9]{6,6}$/,
                          message: "Pincode should only contain numbers and must be of 6 digits!",
                        },                    
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>              
                </div>
                <div className='row m-1'>
                  <div className='col'>                                    
                      <Form.Item
                      label="Contact"
                      name="contact"
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please enter contact!",
                        },
                        {
                          pattern: /^[0-9]{10,10}$/,
                          message: "Contact should only contain numbers and must be of 10 digits!",
                        },                    
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className='col'>                                      
                      <Form.Item
                      label="Mail"
                      name="mail"
                      className='formLabel'
                      rules={[                   
                        {
                          type: 'email',                     
                          message: "Please enter valid email!",
                        },                    
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div> 
                  <div className='col'>                                      
                      <Form.Item
                      label="Date"                    
                      name="appointmentDate"
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please select date!",
                        },                                      
                      ]}
                    >
                      <DatePicker disabledDate={disabledDate} onChange={onChangeDate} />
                    </Form.Item>
                  </div>
                  <div className='col'>                                     
                      <Form.Item
                      label="Time"
                      name="appointmentTime"
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please select time!",
                        },                                      
                      ]}
                    >
                      <TimePicker 
                        onChange={onChangeTime}                        
                      />
                    </Form.Item>
                  </div>                           
                </div>
                <div className='row m-1'>
                  <h5 className='fw-bold border-bottom border-black my-4 formTitles'>Guardian Details</h5>
                  <div className='col'>                                    
                    <Form.Item
                      label="Name"
                      name="guardianName"
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please enter guardian name!",
                        },
                        {
                          pattern: /^[A-Za-z]+$/,
                          message: "Guardian name should only contain alphabets!",
                        },                    
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className='col'>                                    
                    <Form.Item
                      label="Relation"
                      name="guardianRelation"
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please enter relation!",
                        },
                        {
                          pattern: /^[A-Za-z]+$/,
                          message: "Relation should only contain alphabets!",
                        },                    
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className='col'>                                   
                    <Form.Item
                      label="Contact"
                      name="guardianContact"
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please enter contact!",
                        },
                        {
                          pattern: /^[0-9]{10,10}$/,
                          message: "Contact should only contain numbers and must be of 10 digits!",
                        },                    
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>
                <div className='row m-1'>
                  <h5 className='fw-bold border-bottom border-black my-4 formTitles'>Payment Details</h5>
                  <div className='col-4'>                                
                    <Form.Item                  
                      label="Payment Mode"
                      name="payment" 
                      className='formLabel' 
                      rules={[
                        {
                          required: true,
                          message: "Please choose payment mode!",
                        },                                        
                      ]}               
                    >
                      <Radio.Group>
                        <Radio value="done"> Done </Radio>
                        <Radio value="underdone"> Under Done </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>             
                </div>
                <div className='row m-1'> 
                  <h5 className='fw-bold border-bottom border-black my-4 formTitles'>Other Details</h5>
                  <div className='col'>                                    
                    <Form.Item
                      label="Doctor Name"
                      name="doctorName"
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please enter doctor name!",
                        },
                        {
                          pattern: /^[A-Za-z]+$/,
                          message: "Doctor name should only contain alphabets!",
                        },                    
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className='col'>                                   
                    <Form.Item 
                      label="Symptoms" 
                      name='symptoms'
                      className='formLabel'
                      rules={[
                        {
                          required: true,
                          message: "Please enter symptoms!",
                        },                                       
                      ]}
                    >
                        <TextArea rows={3} />
                      </Form.Item>
                  </div>                                                                       
                </div>
                <div>                  
                    <Button 
                      htmlType="submit"
                      className='buttons bg-black text-white fs-5 h-75 border border-black'
                    >
                      Update Appointment
                    </Button>
                </div>
              </ConfigProvider>
          </Form>
        </div>
      </Content>
    </>
  )
}