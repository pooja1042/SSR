import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfigProvider, Layout, Menu  } from 'antd';
import '../Style/style.css'


export const Navigation = () => {
  
  const { Header } = Layout;
  const Navigate = useNavigate()

  function getItem(label, key, children, type) {
    return {
    key,    
    children,
    label,
    type,
    };
  }

  return (
    <>
       <Layout>      
        <ConfigProvider theme={{ token: { fontFamily: 'Times New Roman', fontSize: '16px'},}}>

          {/* NAVIGATION - HEADER */}
          <Header
          className='border-bottom border-black'
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
              height: '70px',
              display: 'flex',
              alignItems: 'center',
              background: '#a8071a', 
            }}
          >
            <div>
              <a href='/'>
                <img src='./images/logo.webp' alt='LOGO' className='logoImg' style={{height: '60px', borderRadius: '100px', marginBottom: '3px'}}/>
              </a>
            </div>
            <div className='mx-3'>
                <a href='/' className='link-offset-2 link-underline link-underline-opacity-0'>
                  <h5 className='webName'>Careme</h5>
                </a>
            </div>
            <div className="demo-logo" />
              <Menu
                  onClick = { ( {key} ) => {
                    Navigate(key)
                  }} 
                  style={{ 
                    flex:1, 
                    background: '#a8071a',                                              
                  }}                           
                  className='text-white'                               
                  mode="horizontal"
                  items={[
                    getItem('Home','/',null),
                    getItem('Appointment',null,[
                      getItem('Add','/Appointment'),
                      getItem('View','/viewAppointment')
                    ],'divider') 
                  ]}
              />             
          </Header>           
        </ConfigProvider>
      </Layout>
    </>
  )
}
