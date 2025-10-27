import React, { useState } from 'react'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'
import { Mail, Eye, EyeOff, LogIn } from 'lucide-react'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  return (
    <div className="bg-[#00A6FF]">
      <section
        className="relative flex items-end min-h-screen"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 13%, rgba(0,0,0,0.57) 50%, rgba(0,0,0,1) 100%)",
        }}
      >
        {/* NAVBAR */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar2 />
        </div>

        <div className="w-full px-[148px] mx-auto">
          <div
            className="
              grid grid-cols-1 lg:grid-cols-2 
              gap-8 lg:gap-20
              items-center 
              w-full 
              py-[120px] lg:py-[255px]
              justify-between
            "
          >
            {/* LEFT SIDE */}
            <section className="flex flex-col justify-center items-center p-5 w-full max-w-[630px] text-center lg:text-left">
              <img
                src="src/assets/images/CinemateLogo2.svg"
                alt="Cinemate Logo"
                className="w-[250px] sm:w-[300px] lg:w-auto mx-auto lg:mx-0"
              />
              <p className="text-white text-justify mt-[15px] text-[20px] sm:text-[22px] lg:text-[26px]">
                Selamat datang di <b>CINEMATE!</b> Temukan jadwal film terbaru,
                pilih kursi favoritmu, dan pesan tiket dengan mudah. Masuk sekarang
                untuk mulai petualangan menontonmu.
              </p>
            </section>

            {/* RIGHT SIDE */}
            <section
              className="
                flex flex-col justify-center items-start 
                bg-white px-[30px] sm:px-[45px] lg:px-[55px] 
                py-[33px] rounded-[15px] 
                w-full max-w-[630px]
              "
            >
              {/* Log In */}
              <div className="flex justify-center lg:justify-start items-start w-full mb-2">
                <h1 className="text-[32px] sm:text-[36px] lg:text-[42px] font-semibold m-0">Log In</h1>
              </div>

              {/* Logo */}
              <div className="flex justify-center items-center w-full mb-2">
                <img
                  src="src/assets/images/CinemateLogo3.svg"
                  alt="Cinemate Logo"
                  className="w-[120px] sm:w-[140px] lg:w-40"
                />
              </div>

              <div className="flex flex-col justify-center items-center w-full mb-6">
                <h3 className="m-0 mb-[7px] text-[22px] sm:text-[26px] lg:text-[30px] font-semibold text-center">
                  Welcome Back to CINEMATE
                </h3>
                <h3 className="text-[#8C97A8] text-xl sm:text-2xl font-light m-0 mb-2 text-center">
                  Enter your email and password to continue
                </h3>
              </div>

              {/* FORM */}
              <form method="get" action="" className="w-full">
                {/* EMAIL */}
                <div className="flex flex-col w-full mb-3">
                  <label htmlFor="email" className="text-xl sm:text-2xl mb-1 font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your Email"
                      className="w-full p-2.5 pr-10 border border-[#00A6FF] rounded-[13px]"
                    />
                    <Mail
                      size={20}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="flex flex-col w-full mb-3">
                  <label htmlFor="password" className="text-xl sm:text-2xl mb-1 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter your Password"
                      className="w-full p-2.5 pr-10 border border-[#00A6FF] rounded-[13px]"
                    />
                    {showPassword ? (
                      <EyeOff
                        size={20}
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                      />
                    ) : (
                      <Eye
                        size={20}
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                <p className="mt-[5px] text-[14px] sm:text-[16px] text-center lg:text-left">
                  Forgot Password?{' '}
                  <a href="#" className="text-black no-underline font-bold">
                    Reset Password
                  </a>
                </p>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full mt-2.5 text-[18px] sm:text-[20px] font-semibold"
                  style={{
                    background: 'linear-gradient(to right, #00A6FF, #045595)',
                    boxShadow: '-1px 0px 9px 0px rgba(0,0,0,0.51)',
                  }}
                >
                  <LogIn size={25} className="absolute left-5 text-white" />
                  Log In
                </button>

                <h1 className="text-center m-0 mt-3 text-[18px] sm:text-[20px] font-semibold">OR</h1>

                {/* GOOGLE BUTTON */}
                <button
                  type="button"
                  className="relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full mt-2.5 text-[18px] sm:text-[20px] font-semibold"
                  style={{
                    background: 'linear-gradient(to right, #00A6FF, #045595)',
                    boxShadow: '-1px 0px 9px 0px rgba(0,0,0,0.51)',
                  }}
                >
                  <img
                    src="src/assets/icons/icon-google.svg"
                    alt="Google Icon"
                    className="absolute left-5 w-[23px] sm:w-[25px] h-[23px] sm:h-[25px]"
                  />
                  Continue with Google
                </button>

                <p className="text-center mt-2.5 mb-0 text-[14px] sm:text-[16px]">
                  Don't have an account?{' '}
                  <a href="./masuk/register.jsp" className="text-black no-underline font-bold">
                    Register
                  </a>
                </p>
              </form>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Login
