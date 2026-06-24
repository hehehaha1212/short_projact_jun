import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import ContactUs from './pages/ContactUs'
import FeaturesSection from './components/landingpage/Features'
import ServiceSection from './components/landingpage/OurServices'
import AboutSection from './components/landingpage/AboutSection'
import HeroSection from './components/landingpage/Hero'
import AdminPanel from './pages/AdminPanel'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection/>
            <ServiceSection/>
            <FeaturesSection />
            <AboutSection/>
            <ContactUs/>
          </>
        }/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App