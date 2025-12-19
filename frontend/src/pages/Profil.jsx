import React, { useState } from 'react'
import Footer from '../components/share/Footer'
import Navbar2 from '../components/share/Navbar2'
import { SquarePen, LockKeyhole, UserPen, History } from 'lucide-react'


function Profil() {
  const [profileImage, setProfileImage] = useState(null)
  const [error, setError] = useState("")

  const MAX_SIZE_MB = 5
  const MAX_WIDTH = 1024
  const MAX_HEIGHT = 1024
  const ALLOWED_TYPES = ["image/jpeg", "image/png"]

  const handleImageChange = (e) => {
    const file = e.target.files[0]
console.log("test");

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
        setError("Resolusi maksimal 1024 x 1024 px")
        return
      }

      // Jika lolos semua validasi
      // setProfileImage(img.src)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage (reader.result)
      }

      reader.readAsDataURL(file)
    }

    img.onerror = () => {
      setError("Gagal memuat gambar")
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

        <div className='p-6 sm:p-10 md:p-20 lg:p-[260px] mx-auto my-auto'>
          <div className='items-center w-full justify-center'>
            {/* Container */}
            <div className='scale-110 sm:scale-115 md:scale-120 lg:scale-125 transform origin-top'>
              <div className='bg-linear-to-b from-[#00A3FB] to-[#045797] rounded-[20px] p-4'>
                <form method="post">
                  <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
                    {/* Left Panel */}
                    <div className='md:col-span-5 bg-gray-100 text-black rounded-[15px] p-4 sm:p-5'>
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
                          className='relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]'>
                          Lihat Riwayat Pesanan
                        </button>
                        <History color="#ffffff" strokeWidth={1.5} 
                        className='absolute left-3 top-1/2 -translate-y-1/2'
                        />
                      </div>
                      

                    </div>

                    {/* Right Panel */}
                    <div className='md:col-span-7 text-white rounded-[15px] p-4 sm:p-6 space-y-4'>
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
                          Hello, Username
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
                            readOnly
                            value={"First Name"}
                            className='bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base' 
                            />
                            <SquarePen size={24} color="#8C97A8" strokeWidth={1.5} 
                              className='absolute right-3 top-1/2 -translate-y-1/2'
                              />
                          </div>
                        </div>
                        {/* Last Name */}
                        <div>
                          <label className="block mb-1 font-semibold">Last Name</label>
                          <div className='relative'>
                            <input 
                              readOnly
                              value={"Last Name"}
                              className='bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base'
                              />
                              <SquarePen size={24} color="#8C97A8" strokeWidth={1.5} 
                              className='absolute right-3 top-1/2 -translate-y-1/2'
                               />
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block mb-1 font-semibold">Email</label>
                        <div className='relative'>
                          <input 
                            className='bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base'
                            readOnly 
                            value={"d*****@gmail.com"}
                            />
                            <SquarePen size={24} color="#8C97A8" strokeWidth={1.5} 
                            className='absolute right-3 top-1/2 -translate-y-1/2'
                            />
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
                      className='relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595} shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]'>
                        Change Password
                      </button>
                      {/* Save */}
                      <div className='flex justify-left mt-10'>
                        <button
                        type='button'
                        className='relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-1/3 text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]'>
                          Save
                        </button>
                        
                        {/* Cancel */}
                        <button
                        type='button'
                        className='relative flex items-center justify-center ml-4 text-white p-2.5 border-none rounded-[15px] cursor-pointer w-1/3 text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]'>
                          Cancel
                        </button>
                      </div>

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