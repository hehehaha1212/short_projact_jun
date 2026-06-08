import React from "react"
import {useState} from "react"
import { Menu, X } from "lucide-react"
import Logo from "../assets/pujaprinters.png";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks= [
    {name:"HOME", link:"/"},
    {name:"SERVICES", link:"/services"},
    {name:"ABOUT", link:"/about"},
    {name:"CONTACT", link:"/contact"},
  ]
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#02152E] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-10 relative">
          
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            <img
                src={Logo}
                alt="Puja Printers"
                className="h-10"
                        />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.link}
                className="text-white font-bold hover:text-blue-600 transition duration-300"
              >
                {link.name}
              </a>
            ))}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.link}
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar