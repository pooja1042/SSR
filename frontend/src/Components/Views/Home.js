import React from 'react'
import { Layout, theme  } from 'antd';
import '../Style/style.css'

export const Home = () => {

  const { Content } = Layout;
  
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

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
          <div className='webTitle w-100'>
            Careme Health
          </div>
        </div>
      </Content>      
    </>
  )
}
