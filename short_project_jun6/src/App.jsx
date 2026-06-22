import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import ContactUs from './pages/ContactUs'
import FeaturesSection from './components/landingpage/Features'
import ServiceSection from './components/landingpage/OurServices'
import AboutSection from './components/landingpage/AboutSection'
import HeroSection from './components/landingpage/Hero'

const App = () => {
  return (
    <>
      <Navbar />
      <HeroSection/>
      <ServiceSection/>
      <FeaturesSection />
      <AboutSection/>
      <Routes>
        <Route path="/" element={<ContactUs/>}/>
        <Route path="/contact-us" element={<ContactUs/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App