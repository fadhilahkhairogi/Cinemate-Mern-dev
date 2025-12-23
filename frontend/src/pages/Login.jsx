import React, { useState } from 'react'
import Navbar2 from '../components/share/Navbar2'
import Footer from '../components/share/Footer'
import { Mail, Eye, EyeOff, LogIn } from 'lucide-react'
import { NavLink, Link } from 'react-router'
import AlertPopup from '../components/share/AlertPopup'

function Login() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [alert, setAlert] = useState(null)
  const [isClosing, setIsClosing] = useState(false)


  const [resetStep, setResetStep] = useState(1)
  const [confirmPassword, setConfirmPassword] = useState('')

  const [resetEmail, setResetEmail] = useState('')
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [showForgotModal, setShowForgotModal] = useState(false)


  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  const resetForgotModalState = () => {
    setResetEmail('')
    setResetCode('')
    setNewPassword('')
    setConfirmPassword('')
    setResetStep(1)
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }


  const handleRequestReset = async () => {
    if (!isValidEmail(resetEmail)) {
      setAlert({
        type: 'error',
        message: 'Format email tidak valid',
      })
      return
    }

    try {
      const res = await fetch(
        'http://localhost:3000/api/users/request-password-reset',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: resetEmail }),
        }
      )

      if (!res.ok) throw new Error()

      setAlert({
        type: 'success',
        message: 'Jika email terdaftar, kode telah dikirim',
      })

      setResetStep(2)
    } catch {
      setAlert({
        type: 'error',
        message: 'Gagal mengirim kode',
      })
    }
  }


  const handleCancelReset = () => {
    if (resetStep === 1) {
      setShowForgotModal(false)
      resetForgotModalState()
    } else {
      setResetStep(prev => prev - 1)
    }
  }

  const closeForgotModal = () => {
    setIsClosing(true)

    setTimeout(() => {
      setShowForgotModal(false)
      setIsClosing(false)
      resetForgotModalState()
    }, 300)
  }

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setAlert({
        type: 'error',
        message: 'Password tidak sama',
      })
      return
    }

    try {
      const res = await fetch(
        'http://localhost:3000/api/users/reset-password',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: resetCode,
            newPassword,
          }),
        }
      )

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setAlert({
        type: 'success',
        message: 'Password berhasil diubah',
      })

      setTimeout(() => {
        setShowForgotModal(false)
        resetForgotModalState()
      }, 1500)
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.message,
      })
    }
  }



  const handleCheckCode = async () => {
    try {
      const res = await fetch(
        'http://localhost:3000/api/users/verify-reset-token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: resetCode,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setAlert({
          type: 'error',
          message: 'Kode salah atau kadaluarsa',
        })
        setResetCode('')
        return
      }

      setResetStep(3)
      setAlert({
        type: 'success',
        message: 'Kode valid',
      })
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Terjadi kesalahan',
      })
    }
  }





  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.user.role)

        if (data.user.role === 'user') {
          window.location.href = '/home'
        } else if (data.user.role === 'admin') {
          window.location.href = '/admin-film'
        } else if (data.user.role === 'superadmin') {
          window.location.href = '/admin-pengguna'
        }
      } else {
        setMessage(data.message)
      }
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

        <div className="px-6 sm:px-10 md:px-20 lg:px-[148px] mx-auto">
          <div
            className="
              grid grid-cols-1 lg:grid-cols-2 
              gap-16 lg:gap-40
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
                Selamat datang di <b>CINEMATE!</b> Temukan jadwal film terbaru, pilih kursi
                favoritmu, dan pesan tiket dengan mudah. Masuk sekarang untuk mulai petualangan
                menontonmu.
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
                <h1 className="text-[32px] sm:text-[36px] lg:text-[42px] font-semibold m-0">
                  Log In
                </h1>
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
              {/* <form method="get" action="" className="w-full"> */}
              <form onSubmit={handleSubmit} className="w-full">
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

                <p className="mt-[5px] text-[14px] sm:text-[16px] text-center lg:text-left">
                  Forgot Password?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsClosing(false)
                      setShowForgotModal(true)
                      setResetStep(1)
                    }}
                    className="text-black font-bold underline cursor-pointer"
                  >
                    Reset Password
                  </button>

                </p>


                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full mt-2.5 text-[18px] sm:text-[20px] font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]"
                >
                  <LogIn size={25} className="absolute left-5 text-white" />
                  Log In
                </button>

                <h1 className="text-center m-0 mt-3 text-[18px] sm:text-[20px] font-semibold">
                  OR
                </h1>

                {/* GOOGLE BUTTON */}
                <button
                  type="button"
                  className="relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full mt-2.5 text-[18px] sm:text-[20px] font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]"
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
                  Don't have an account?{' '}
                  <NavLink to="/register">
                    {({ isActive }) => (
                      <span className={isActive ? 'active' : 'font-bold'}>Register</span>
                    )}
                  </NavLink>
                </p>
              </form>
            </section>
          </div>
        </div>
      </section>

      {showForgotModal && (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={closeForgotModal}
      >
        <div
          className={`
            bg-white w-[400px] rounded-xl p-6
            shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]
            ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="flex items-center mb-6 justify-center gap-1.5 text-2xl text-white rounded-xl shadow-md font-bold px-4 py-2 bg-linear-to-r from-[#00A6FF] to-[#045595]">
            Reset Password
          </h2>


          {/* STEP 1 — EMAIL */}
          {resetStep === 1 && (
            <>
              <input
                type="email"
                placeholder="Masukkan Email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full p-2.5 border border-[#00A6FF] rounded-[13px] mb-4"
              />
              <div className="mt-2 flex justify-end gap-3">
                    <button
                      onClick={handleCancelReset}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF0004] text-white font-semibold hover:bg-[#b90003] active:scale-95 cursor-pointer shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]"
                    >
                      <span>
                        <img src="/icons/icon-crossFill.svg" />
                      </span>
                      Cancel
                    </button>


                    <button
                      disabled={!isValidEmail(resetEmail)}
                      onClick={handleRequestReset}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg active:scale-95 text-white font-semibold shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]
                        ${isValidEmail(resetEmail)
                          ? 'bg-[#00FF1A] hover:bg-[#00df16] cursor-pointer'
                          : 'bg-gray-300 cursor-not-allowed'}
                      `}
                    >
                      <img src="/icons/icon-checkFill.svg"/>
                      Send
                    </button>
                  </div>
            </>
          )}

          {/* STEP 2 — KODE */}
          {resetStep === 2 && (
            <>
              <input
                type="text"
                placeholder="Masukkan Kode"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                className="w-full p-2.5 border border-[#00A6FF] rounded-[13px] mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelReset}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF0004] text-white font-semibold hover:bg-[#b90003] active:scale-95 cursor-pointer shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]"
                >
                  <span>
                    <img src="/icons/icon-crossFill.svg" />
                  </span>
                  Back
                </button>

                <button
                  onClick={handleCheckCode}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00FF1A] hover:bg-[#00df16] active:scale-95 cursor-pointer text-white font-semibold shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]"
                >
                  <span>
                    <img src="/icons/icon-checkFill.svg"/>
                  </span> Next
                </button>
              </div>
            </>
          )}


          {/* STEP 3 — PASSWORD */}
          {resetStep === 3 && (
            <>
              <input
                type="password"
                placeholder="Password Baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2.5 border border-[#00A6FF] rounded-[13px] mb-4"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2.5 border border-[#00A6FF] rounded-[13px] mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelReset}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF0004] text-white font-semibold hover:bg-[#b90003] active:scale-95 cursor-pointer shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]"
                >
                  <span>
                    <img src="/icons/icon-crossFill.svg" />
                  </span>
                  Back
                </button>

                <button
                  onClick={handleResetPassword}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00FF1A] hover:bg-[#00df16] active:scale-95 cursor-pointer text-white font-semibold shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]"
                >
                  <span>
                    <img src="/icons/icon-checkFill.svg"/>
                  </span> Reset Password
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )}
      {alert && (
        <AlertPopup
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}


      <Footer />
    </div>
  )
}

export default Login
