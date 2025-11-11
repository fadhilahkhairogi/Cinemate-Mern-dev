import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { LogIn, Menu, Search, User } from 'lucide-react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [localQuery, setLocalQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const search = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  // const handleSearch = e => {
  //   e.preventDefault()
  //   const trimmed = localQuery.trim()
  //   setQuery(trimmed)
  //   // navigate(`/daftar-film?title=${encodeURIComponent(trimmed)}`) // optional, sync URL
  // }

  const handleSearch = e => {
    e.preventDefault()
    const trimmed = localQuery.trim().toLowerCase()
    navigate(localQuery ? `/daftar-film?title=${encodeURIComponent(trimmed)}` : '/daftar-film')
  }
  useEffect(() => {
    const delay = setTimeout(() => {
      setQuery(localQuery.trim())
    }, 300) // wait 300 ms after last keystroke
    return () => clearTimeout(delay)
  }, [localQuery])

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search)
  //   const title = params.get('title')

  //   // console.log(title)

  //   if (title) {
  //     fetch(`http://localhost:3000/movies/view?title=${title}`)
  //       .then(res => res.json())
  //       .then(data => setMovies(data.movies))
  //   }
  //   navigate(`/daftar-film?title=${title}&filter-genre=${genre}`)
  // }, [location.search])

  // const handleSearch = e => {
  //   e.preventDefault()
  //   const q = query.trim()
  //   console.log(q)
  //   navigate(q ? `/daftar-film?title=${encodeURIComponent(q)}` : '/daftar-film')
  // }

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search)
  //   const title = params.get('title')
  //   if (title) {
  //     fetch(`http://localhost:3000/movies/view?title=${title}`)
  //       .then(res => res.json())
  //       .then(data => setMovies(data.movies))
  //   }
  // }, [location.search])
  return (
    <div>
      <nav className="flex items-center bg-transparent text-white h-[130px]">
        <div className="w-full px-[148px] mx-auto py-3 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            {/* <a href="/movies" className="flex items-center"> */}
            <NavLink to="/daftar-film">
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-blue-500' : 'text-white'}>Register</span>
                  <img
                    src="/images/CinemateLogo.png"
                    alt="LogoCinemate"
                    width={252}
                    height={64}
                    className="object-contain"
                  />
                </>
              )}
            </NavLink>

            {/* Link navigasi */}
            <div className="hidden md:flex items-center">
              <NavLink
                to="/daftar-film"
                className="text-2xl text-white ml-[71px] hover:text-gray-300 transition"
              >
                Movies
              </NavLink>
              <a href="#" className="text-2xl text-white ml-[71px] hover:text-gray-300 transition">
                F&B
              </a>
            </div>
          </div>

          {/* Tombol hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl focus:outline-none cursor-pointer"
          >
            <Menu />
          </button>

          {/* Search dan Profile */}
          <div className="hidden md:flex md:items-center md:w-auto">
            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              action={location.pathname}
              method="get"
              role="search"
              className="mt-4 md:mt-0 md:ml-6 flex items-center"
            >
              <div className="flex items-center w-[322px] h-9 bg-white opacity-60 rounded-md overflow-hidden">
                <span className="px-3 text-[#464C55]">
                  <Search />
                </span>
                <input
                  type="text"
                  name="title"
                  placeholder="Search movies"
                  value={localQuery}
                  onChange={e => setLocalQuery(e.target.value)}
                  className="bg-transparent text-black w-full text-[17px] placeholder-[#464C55] px-1 py-1 outline-none border-none"
                />
              </div>
            </form>

            {/* Profile */}
            <div className="relative ml-4">
              <button
                type="button"
                onClick={() => setShowDropdown(prev => !prev)}
                className="w-10 h-10 rounded-full cursor-pointer border border-white flex items-center justify-center hover:bg-white hover:text-gray-900 transition"
              >
                <User className="size-5" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-10 bg-white rounded-md shadow-lg z-10">
                  <Link
                    href="/Login"
                    className="block px-4 py-2 text-center justify-center text-black"
                  >
                    <LogIn className="size-5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MENU MOBILE */}
        {isOpen && (
          <div className="w-full md:hidden bg-black bg-opacity-90 text-center py-4 space-y-4 transition-all duration-300">
            {/* Links */}
            <a
              href="/movies"
              className="block text-xl text-white hover:text-gray-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Movies
            </a>
            <a
              href="/fnb"
              className="block text-xl text-white hover:text-gray-300 transition"
              onClick={() => setIsOpen(false)}
            >
              F&B
            </a>

            {/* Search bar (mobile) */}
            <form
              onSubmit={handleSearch}
              // action={location.pathname}
              // method="get"
              role="search"
              className="flex justify-center items-center px-6"
            >
              <div className="flex items-center w-full h-9 bg-white opacity-60 rounded-md overflow-hidden">
                <span className="px-3 text-[#464C55]">
                  <Search />
                </span>
                <input
                  type="text"
                  name="title"
                  placeholder="Search movies"
                  value={localQuery}
                  onChange={e => setLocalQuery(e.target.value)}
                  className="bg-transparent text-black w-full text-[17px] placeholder-[#464C55] px-1 py-1 outline-none border-none"
                />
              </div>
            </form>

            {/* Profile (mobile) */}
            <div className="flex justify-center mt-3">
              <button
                type="button"
                onClick={() => setShowDropdown(prev => !prev)}
                className="w-10 h-10 rounded-full cursor-pointer border border-white flex items-center justify-center hover:bg-white hover:text-gray-900 transition"
              >
                <User className="size-5" />
              </button>
            </div>

            {showDropdown && (
              <div className="flex justify-center mt-2">
                <Link
                  href="/Login"
                  className="block px-4 py-2 text-center justify-center bg-white text-black rounded-md w-[50px]"
                  onClick={() => {
                    setShowDropdown(false)
                    setIsOpen(false)
                  }}
                >
                  <LogIn className="size-5 mx-auto" />
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
