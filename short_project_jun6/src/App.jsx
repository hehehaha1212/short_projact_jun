import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import ContactUs from './pages/ContactUs'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ContactUs/>}/>
        <Route path="/contact-us" element={<ContactUs/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App