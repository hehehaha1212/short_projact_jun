import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

import { useState, useEffect } from "react";
import { fetchBanners } from "./../api.js";
import hero1 from "./../assets/hero1.png";
import hero2 from "./../assets/hero2.png";
import hero3 from "./../assets/hero3.png";

const ContactUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([hero1, hero2, hero3]);
  useEffect(() => {
    fetchBanners()
      .then((data) => {
        if (data && data.images && data.images.length > 0)
          setImages(data.images);
      })
      .catch((err) => console.error("Could not load database banners:", err));
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="w-full bg-white mx-auto text-left">
      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden px-6 md:px-16 lg:px-24">
        <div className="absolute inset-0 w-full h-full z-0">
          {images.map((imgUrl, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
            >
              <img
                src={imgUrl}
                alt={`Background slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[3px]"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-left pt-32 pb-20">
          <h4 className="text-[#FFC107] font-bold text-xl mb-3">
            Get In Touch With Us
          </h4>

          <h1 className="text-4xl md:text-6xl text-white font-bold leading-tight">
            Let's Print Something
            <br />
            <span className="text-blue-400">Amazing Together</span>
          </h1>

          <p className="mt-6 text-white max-w-md text-lg">
            We would love to hear from you. Whether you have a query or want to
            discuss your printing needs.
          </p>

          <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition">
            Contact Us →
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 h-2.5 rounded-full cursor-pointer ${
                index === currentSlide
                  ? "w-8 bg-[#FFC107]"
                  : "w-2.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Side */}
          <div>
            <h2 className="text-4xl font-bold mb-4 text-black">GET IN TOUCH</h2>

            <p className="text-gray-600 mb-8 pb-6">
              Need high-quality printing services or have a custom printing
              requirement? Contact Puja Printers, and we will be happy to assist
              you.
            </p>

            {/* Address Card */}
            <div className="border rounded-2xl p-5 flex items-center gap-4 mb-6 shadow-sm">
              <div className="bg-red-100 p-4 rounded-xl">
                <FaMapMarkerAlt className="text-red-500 text-2xl" />
              </div>

              <div>
                <h3 className="font-bold text-lg">Our Location</h3>
                <p className="text-gray-500 text-sm">
                  Rajendra Prasad Colony (West), Gorakhnath, Gorakhpur - 273010
                  (U.P)
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="border rounded-2xl p-5 flex items-center gap-4 mb-6 shadow-sm">
              <div className="bg-green-100 p-4 rounded-xl">
                <FaEnvelope className="text-green-500 text-2xl" />
              </div>

              <div>
                <h3 className="font-bold text-lg">Mail Us</h3>
                <p className="text-gray-500 text-sm">pujaprinters@gmail.com</p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="border rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-blue-100 p-4 rounded-xl">
                <FaPhoneAlt className="text-blue-500 text-2xl" />
              </div>

              <div>
                <h3 className="font-bold text-lg">Call Us</h3>
                <p className="text-gray-500 text-sm">+91 8127918160</p>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="border rounded-3xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold mb-6">SEND US A MESSAGE</h2>

            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Phone No.
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Message
                </label>

                <textarea
                  rows="5"
                  className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
