import Navbar2 from '../components/share/Navbar2'
import Footer from '../components/share/Footer'

function Test() {
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

        <div>
          <p>Test Page</p>
        </div>
      </section>

      {/* Footer */}
      <section>
        <Footer />
      </section>
    </div>
  )
}

export default Test
