import React from 'react'
import Routing from './Utils/Routing'
import AuthModal from './Components/templates/AuthModal'

const App = () => {
  return (
    <div className='bg-[#1f1e24] w-full h-screen'>
         <Routing />
         <AuthModal />
    </div>
  )
}

export default App