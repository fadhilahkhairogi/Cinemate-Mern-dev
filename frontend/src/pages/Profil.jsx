import React, { useState, useEffect } from 'react'
import Footer from '../components/share/Footer'
import Navbar2 from '../components/share/Navbar2'
import { SquarePen, LockKeyhole, UserPen, History } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


function Profil() {
  const [resetStep, setResetStep] = useState(1)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [alert, setAlert] = useState(null)
  const [isClosing, setIsClosing] = useState(false)

  const [profileImage, setProfileImage] = useState(null)
  const [error, setError] = useState("")

  const MAX_SIZE_MB = 5
  const MAX_WIDTH = 512
  const MAX_HEIGHT = 512
  const ALLOWED_TYPES = ["image/jpeg", "image/png"]

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    // Reset error
    setError("")

    // ✅ Validasi tipe file
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Format file harus JPG atau PNG")
      return
    }

    // ✅ Validasi ukuran file
    const fileSizeMB = file.size / 1024 / 1024
    if (fileSizeMB > MAX_SIZE_MB) {
      setError("Ukuran file maksimal 5 MB")
      return
    }

    // ✅ Validasi dimensi gambar
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {

      URL.revokeObjectURL(img.src);

      if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
        setError("Resolusi maksimal 512 x 512 px")
        return
      }

      // Jika lolos semua validasi
      // setProfileImage(img.src)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }

      reader.readAsDataURL(file)
    }

    img.onerror = () => {
      setError("Gagal memuat gambar")
    }
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const [savedData, setSavedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }


  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState(null)


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    }
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch("http://localhost:3000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        if (res.ok) {
          const userData = {
            firstName: data.user.first_name,
            lastName: data.user.last_name,
            email: data.user.email,
          }

          setFormData(userData)
          setSavedData(userData)
          if (data.user.photo_profile) {
            const photo = data.user.photo_profile
            // Check if photo is a Buffer object (standard behavior when JSONifying a Buffer)
            if (photo && photo.type === 'Buffer' && Array.isArray(photo.data)) {
              // Convert the byte array back to the Base64 string
              const base64String = new TextDecoder().decode(new Uint8Array(photo.data))
              setProfileImage(base64String)
            } else {
              setProfileImage(photo)
            }
          }
        }

      } catch (err) {
        console.error(err)
      }
    }

    fetchProfile()
  }, [navigate])

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          photo_profile: profileImage,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setSavedData(formData)
        setIsEditing({ firstName: false, lastName: false, email: false })
      } else {
        alert(data.error || "Gagal update profile")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const resetForgotModalState = () => {
    setResetEmail('')
    setResetCode('')
    setNewPassword('')
    setConfirmPassword('')
    setResetStep(1)
  }

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleRequestReset = async () => {
    if (!isValidEmail(resetEmail)) {
      setAlert({ type: 'error', message: 'Format email tidak valid' })
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      })
      if (!res.ok) throw new Error()
      setAlert({ type: 'success', message: 'Jika email terdaftar, kode telah dikirim' })
      setResetStep(2)
    } catch {
      setAlert({ type: 'error', message: 'Gagal mengirim kode' })
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

  const handleCheckCode = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users/verify-reset-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetCode }),
      })
      const data = await res.json()
      if (!res.ok) {
        setAlert({ type: 'error', message: 'Kode salah atau kadaluarsa' })
        setResetCode('')
        return
      }
      setResetStep(3)
      setAlert({ type: 'success', message: 'Kode valid' })
    } catch {
      setAlert({ type: 'error', message: 'Terjadi kesalahan' })
    }
  }

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setAlert({ type: 'error', message: 'Password tidak sama' })
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetCode, newPassword }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setAlert({ type: 'success', message: 'Password berhasil diubah, silakan login kembali.' })
      setTimeout(() => {
        setShowForgotModal(false)
        resetForgotModalState()
        localStorage.clear()
        navigate('/login')
      }, 1500)
    } catch (err) {
      setAlert({ type: 'error', message: err.message })
    }
  }


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

        <div className='w-full mt-24 px-4 sm:px-8 lg:px-12 py-12'>
          <div className='w-full max-w-[1600px] mx-auto'>
            {/* Container */}
            <div className='mt-2 w-full max-w-[1400px] mx-auto'>
              <div className='bg-linear-to-b from-[#00A3FB] to-[#045797] rounded-[20px] p-4'>
                <form method="post">
                  <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
                    {/* Left Panel */}
                    <div className='md:col-span-4 bg-gray-100 text-black rounded-[15px] p-4 sm:p-5'>
                      {/* Kelola Profil */}
                      <div className='relative mb-4'>
                        <button
                          type='button'
                          className='relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]'>
                          Kelola Profil
                        </button>
                        <UserPen color="#ffffff" strokeWidth={1.5}
                          className='absolute left-3 top-1/2 -translate-y-1/2'
                        />
                      </div>
                      {/* Riwayat Pesanan */}
                      <div className='relative'>
                        <button
                          type='button'
                          onClick={() => navigate("/histori-pesanan")}
                          className='relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]'>
                          Lihat Riwayat Pesanan
                        </button>
                        <History color="#ffffff" strokeWidth={1.5}
                          className='absolute left-3 top-1/2 -translate-y-1/2'
                        />
                      </div>


                    </div>

                    {/* Right Panel */}
                    <div className='md:col-span-8 text-white rounded-[15px] p-4 sm:p-6 space-y-4'>
                      <div className="flex items-center gap-4 mb-4">
                        {/* Foto Profil */}
                        <div className="relative">
                          <img
                            src={profileImage || "/images/default-avatar.png"}
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover border-2 border-white"
                          />

                          {/* Upload Icon */}
                          <label className="absolute bottom-0 right-0 bg-[#00A6FF] p-1 rounded-full cursor-pointer">
                            <SquarePen size={16} color="white" />
                            <input
                              type="file"
                              accept="image/png, image/jpeg"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>

                        {/* Username */}
                        <h1 className="text-xl sm:text-2xl font-bold">
                          Hello, {savedData?.firstName}
                        </h1>
                      </div>

                      {/* error */}
                      {error && (
                        <p className='text-sm text-red-500 font-medium mt-2'>
                          {error}
                        </p>
                      )}

                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        {/* First Name */}
                        <div>
                          <label className="block mb-1 font-semibold">First Name</label>
                          <div className='relative'>
                            <input
                              name='firstName'
                              value={formData.firstName}
                              readOnly={!isEditing.firstName}
                              onChange={handleChange}
                              className='bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base'
                            />

                            <button
                              type='button'
                              onClick={() =>
                                setIsEditing({ ...isEditing, firstName: true })
                              }
                              className='absolute right-3 top-1/2 -translate-y-1/2'
                            >
                              <SquarePen size={24} color="#8C97A8" strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                        {/* Last Name */}
                        <div>
                          <label className="block mb-1 font-semibold">Last Name</label>
                          <div className='relative'>
                            <input
                              name='lastName'
                              value={formData.lastName}
                              readOnly={!isEditing.lastName}
                              onChange={handleChange}
                              className='bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base'
                            />
                            <button
                              type='button'
                              onClick={() =>
                                setIsEditing({ ...isEditing, lastName: true })
                              }
                              className='absolute right-3 top-1/2 -translate-y-1/2'
                            >
                              <SquarePen size={24} color="#8C97A8" strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block mb-1 font-semibold">Email</label>
                        <div className='relative'>
                          <input
                            name='email'
                            value={formData.email}
                            readOnly={!isEditing.email}
                            onChange={handleChange}
                            className='bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base'
                          />
                          <button
                            type='button'
                            onClick={() =>
                              setIsEditing({ ...isEditing, email: true })
                            }
                            className='absolute right-3 top-1/2 -translate-y-1/2'
                          >
                            <SquarePen size={24} color="#8C97A8" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block mb-1 font-semibold">Password</label>
                        <div className='relative'>
                          <input
                            className='bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base'
                            readOnly
                            value={"***********"}
                          />
                          <LockKeyhole size={24} color="#8C97A8" strokeWidth={1.5}
                            className='absolute right-3 top-1/2 -translate-y-1/2'
                          />
                        </div>
                      </div>

                      {/* Change Password */}
                      <button
                        type='button'
                        onClick={() => setShowForgotModal(true)}
                        className='relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]'>
                        Change Password
                      </button>
                      {/* Save */}
                      <div className='flex justify-left mt-10'>
                        <button
                          type='button'
                          onClick={handleSave}
                          className='relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-1/3 text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]'>
                          Save
                        </button>

                        {/* Cancel */}
                        <button
                          type='button'
                          onClick={() => {
                            setFormData(savedData)
                            setIsEditing({ firstName: false, lastName: false, email: false })
                          }}
                          className='relative flex items-center justify-center ml-4 text-white p-2.5 border-none rounded-[15px] cursor-pointer w-1/3 text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]'>
                          Cancel
                        </button>
                      </div>

                      {showForgotModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                          <div className={`bg-white rounded-lg p-6 w-full max-w-md transition-transform ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>

                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                              <h2 className="text-xl font-semibold text-black">Reset Password</h2>
                              <button type="button" onClick={closeForgotModal} className="text-black font-bold text-lg">&times;</button>
                            </div>

                            {/* Alert */}
                            {alert && (
                              <div className={`mb-3 p-2 rounded text-sm ${alert.type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                                {alert.message}
                              </div>
                            )}

                            {/* Step 1: Request Reset */}
                            {resetStep === 1 && (
                              <div className="space-y-3">
                                <label className="block font-medium text-black">Email</label>
                                <input
                                  type="email"
                                  value={resetEmail}
                                  onChange={(e) => setResetEmail(e.target.value)}
                                  className="w-full p-2 border rounded text-black"
                                />
                                <div className="flex justify-between mt-4">
                                  <button
                                    type="button"
                                    onClick={handleCancelReset}
                                    className="px-4 py-2 bg-gray-300 rounded text-black"
                                  >Cancel</button>
                                  <button
                                    type="button"
                                    onClick={handleRequestReset}
                                    className="px-4 py-2 bg-blue-500 rounded text-white"
                                  >Send Code</button>
                                </div>
                              </div>
                            )}

                            {/* Step 2: Verify Code */}
                            {resetStep === 2 && (
                              <div className="space-y-3">
                                <label className="block font-medium text-black">Verification Code</label>
                                <input
                                  type="text"
                                  value={resetCode}
                                  onChange={(e) => setResetCode(e.target.value)}
                                  className="w-full p-2 border rounded text-black"
                                />
                                <div className="flex justify-between mt-4">
                                  <button
                                    type="button"
                                    onClick={handleCancelReset}
                                    className="px-4 py-2 bg-gray-300 rounded text-black"
                                  >Back</button>
                                  <button
                                    type="button"
                                    onClick={handleCheckCode}
                                    className="px-4 py-2 bg-blue-500 rounded text-white"
                                  >Verify</button>
                                </div>
                              </div>
                            )}

                            {/* Step 3: New Password */}
                            {resetStep === 3 && (
                              <div className="space-y-3">
                                <label className="block font-medium text-black">New Password</label>
                                <input
                                  type="password"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  className="w-full p-2 border rounded text-black"
                                />
                                <label className="block font-medium text-black">Confirm Password</label>
                                <input
                                  type="password"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  className="w-full p-2 border rounded text-black"
                                />
                                <div className="flex justify-between mt-4">
                                  <button
                                    type="button"
                                    onClick={handleCancelReset}
                                    className="px-4 py-2 bg-gray-300 rounded text-black"
                                  >Back</button>
                                  <button
                                    type="button"
                                    onClick={handleResetPassword}
                                    className="px-4 py-2 bg-blue-500 rounded text-white"
                                  >Reset</button>
                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </section>
      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Profil