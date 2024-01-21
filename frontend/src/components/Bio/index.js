import React from 'react'
import Header from './Header'
import Content from './Content'



const index = () => {
    const item = [
        
    ]
    
  return (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
        }}
    >
    <Header item={item}/>
    <Content />
    </div>
  )
}

export default index