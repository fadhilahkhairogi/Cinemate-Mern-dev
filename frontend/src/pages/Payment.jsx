import React from 'react'
import Footer from '../components/share/Footer'
import Navbar2 from '../components/share/Navbar2'


function Payment() {
  return (
    
    <div className="bg-[#00A6FF]">
      {/* Background */}
      <section
        className="relative flex min-h-screen"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.85) 13%, rgba(0,0,0,0.57) 50%, rgba(0,0,0,1) 100%)',
        }}
      >
      {/* NAVBAR */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar2 />
        </div>
      </section>
      {/* footer */}
        <div>
          <Footer />
        </div>
    </div>
  )
}

export default Payment