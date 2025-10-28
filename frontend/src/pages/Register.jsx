import React, { useState } from 'react'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'
import { Mail, Eye, EyeOff, LogIn, User } from 'lucide-react'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const togglePassword = () => setShowPassword(!showPassword)

  const handleSubmit = async e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Password dan Confirm Password harus sama!')
      return
    }

    setError('')

    try {
      const res = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
        // body: JSON.stringify({ firstName, lastName, username, email, password }),
      })

      const data = await res.json()
      setMessage(data.message || data.error)
    } catch (error) {
      console.error(error)
      setMessage('Error connecting to server')
    }
  }

  return (
    <div className="bg-[#00A6FF]">
      <section
        className="relative flex items-end min-h-screen"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.85) 13%, rgba(0,0,0,0.57) 50%, rgba(0,0,0,1) 100%)',
        }}
      >
        {/* NAVBAR */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar2 />
        </div>

        {/* MAIN CONTAINER */}
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
            <section
              className="
                flex flex-col justify-center items-start 
                bg-white px-[30px] sm:px-[45px] lg:px-[55px] 
                py-[33px] rounded-[15px] 
                w-full max-w-[630px]
              "
            >
              {/* Register */}
              <div className="flex justify-center lg:justify-start items-start w-full mb-2">
                <h1 className="text-[32px] sm:text-[36px] lg:text-[42px] font-semibold m-0">
                  Register
                </h1>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="w-full">
                {/* First and Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-xl sm:text-2xl mb-1 font-medium">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" />
                      <input
                        id="firstName"
                        type="text"
                        placeholder="Enter your First Name"
                        required
                        onChange={e => setFirstName(e.target.value)}
                        className="w-full p-2.5 pl-10 border border-[#00A6FF] rounded-[13px]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-xl sm:text-2xl mb-1 font-medium">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" />
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Enter your Last Name"
                        required
                        onChange={e => setLastName(e.target.value)}
                        className="w-full p-2.5 pl-10 border border-[#00A6FF] rounded-[13px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Username */}

                {/* <div className="flex flex-col">
                  <label htmlFor="username" className="text-xl sm:text-2xl mb-1 font-medium">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" />
                    <input
                      id="username"
                      type="text"
                      placeholder="Enter your Username"
                      required
                      onChange={e => setUsername(e.target.value)}
                      className="w-full p-2.5 pl-10 border border-[#00A6FF] rounded-[13px]"
                    />
                  </div>
                </div> */}

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
                      onChange={e => setEmail(e.target.value)}
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
                      value={password}
                      onChange={e => setPassword(e.target.value)}
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
                {/* CONFIRM PASSWORD */}
                <div className="flex flex-col w-full mb-3">
                  <label htmlFor="confirmPassword" className="text-xl sm:text-2xl mb-1 font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Confirm your Password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
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
                  {/* Pesan error */}
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                <p className="text-[14px]">
                  By continuing, you agree to Cinemate's
                  <a href="#" className="font-semibold ml-1 no-underline">
                    Terms of Service
                  </a>{' '}
                  and acknowledge you've read our
                  <a href="#" className="font-semibold ml-1 no-underline">
                    Privacy Policy
                  </a>
                  .
                </p>
                {/* CONTINUE BUTTON */}
                <button
                  type="submit"
                  className="relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full mt-2.5 text-[18px] sm:text-[20px] font-semibold"
                  style={{
                    background: 'linear-gradient(to right, #00A6FF, #045595)',
                    boxShadow: '-1px 0px 9px 0px rgba(0,0,0,0.51)',
                  }}
                >
                  <LogIn size={25} className="absolute left-5 text-white" />
                  Continue
                </button>
                <h1 className="text-center m-0 mt-3 text-[18px] sm:text-[20px] font-semibold">
                  OR
                </h1>
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

                {/*Logging*/}
                {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                {/*End Logging*/}

                <p className="text-center mt-2.5 mb-0 text-[14px] sm:text-[16px]">
                  Already have an account?{' '}
                  <a href="src/pages/Login.jsx" className="text-black no-underline font-bold">
                    Log In
                  </a>
                </p>
              </form>
            </section>

            {/* RIGHT SIDE */}
            <section className="flex flex-col justify-center items-center p-5 w-full max-w-[630px] text-center lg:text-left">
              <img
                src="src/assets/images/CinemateLogo2.svg"
                alt="Cinemate Logo"
                className="w-[250px] sm:w-[300px] lg:w-auto mx-auto lg:mx-0"
              />
              <p className="text-white text-justify mt-[15px] text-[20px] sm:text-[22px] lg:text-[26px]">
                Selamat datang di <b>CINEMATE!</b> Temukan jadwal film terbaru, pilih kursi
                favoritmu, dan pesan tiket dengan mudah. Masuk sekarang untuk mulai petualangan
                menontonmu.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Register
