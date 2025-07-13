import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage'
import React from 'react'
import CalenderPage from './components/CalenderPage'
import NotFound from './pages/NotFound'



function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/calendar' element={<CalenderPage/>}/>
      <Route path="*" element={<NotFound />} />
     </Routes>
    </>
  )
}

export default App
