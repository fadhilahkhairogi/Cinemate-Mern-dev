import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ChevronDown, ChevronUp, ListFilter } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import MessagePopup from '../components/MessagePopup'

function DaftarFilm() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('None')
  const dropdownRef = useRef(null)
  const location = useLocation()
  const [listMovie, setListMovie] = useState(null)
  const [message, setMessage] = useState('')
  const [genre, setGenre] = useState('')
  // const [query, setQuery] = useState('')

  // const params = new URLSearchParams(location.search)
  // const title = params.get('title') || ''

  const fetchMovies = async (paramsObj = null) => {
    let url = 'http://localhost:3000/api/movies/daftar-film'
    const params = paramsObj || new URLSearchParams(location.search)
    const title = params.get('title') || ''
    const genreParam = params.get('genre') || ''

    const queryParams = []
    if (title) queryParams.push(`title=${encodeURIComponent(title)}`)
    if (genreParam) queryParams.push(`genre=${encodeURIComponent(genreParam)}`)
    if (queryParams.length > 0) url += `?${queryParams.join('&')}`
    // if (title) url += `?title=${encodeURIComponent(title)}`
    let res = await fetch(url)
    let data = await res.json()
    setMessage(data.message || '')

    if (!data.movies || data.movies.length === 0) {
      res = await fetch('http://localhost:3000/api/movies/daftar-film')
      data = await res.json()
    }
    // if (data.message) {
    //   setTimeout(() => setMessage(''), 4321)
    // }
    setListMovie(data.movies)
  }

  const handleGenreChange = e => {
    const selectedGenre = e.target.value
    setGenre(selectedGenre)

    const params = new URLSearchParams(location.search)
    if (selectedGenre) params.set('genre', selectedGenre)
    else params.delete('genre')

    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`)

    fetchMovies(params)
  }

  useEffect(() => {
    fetchMovies()
  }, [location.search])
  // useEffect(() => {
  //   // const params = new URLSearchParams(location.search)
  //   // const title = params.get('title') || ''

  //   const fetchMovieList = async () => {
  //     try {
  //       const res = await fetch(
  //         `http://localhost:3000/api/movies/daftar-film``http://localhost:3000/api/movies/daftar-film?title=${encodeURIComponent(
  //           title
  //         )}`
  //       )
  //       const data = await res.json()
  //       setListMovie(data.movies)
  //       setMessage(data.message || '')
  //     } catch (error) {
  //       console.error(error)
  //       setMessage('Error connecting to server')
  //     }
  //   }

  //   fetchMovieList()
  // }, [location.search])

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!listMovie) return <p>Loading movies...</p>

  const options = [
    'None',
    'Adventure',
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Animation',
    'Fantasy',
  ]
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
          <Navbar />
        </div>

        <div className="w-full px-[148px] my-50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex gap-12">
              {/* NOW SHOWING */}
              <NavLink
                to="/daftar-film/now-showing"
                className={({ isActive }) =>
                  isActive
                    ? 'px-4 py-2 font-bold text-2xl text-white w-[195px] h-[55px] rounded-[15px] cursor-pointer shadow-[-1px_0px_9px_rgba(0,0,0,0.51)] bg-linear-to-r from-[#00A6FF] to-[#045595]'
                    : 'p-0.5 rounded-[15px] bg-linear-to-r from-[#00A6FF] to-[#045595] cursor-pointer'
                }
              >
                {({ isActive }) =>
                  !isActive ? (
                    <div className="bg-[#001826] w-[195px] h-[55px] rounded-[15px] flex items-center justify-center font-bold text-2xl text-white hover:bg-[#045595]">
                      Now Showing
                    </div>
                  ) : (
                    'Now Showing'
                  )
                }
              </NavLink>

              {/* UPCOMING */}
              <NavLink
                to="/daftar-film/upcoming"
                className={({ isActive }) =>
                  isActive
                    ? 'px-4 py-2 font-bold text-2xl text-white w-[195px] h-[55px] rounded-[15px] cursor-pointer shadow-[-1px_0px_9px_rgba(0,0,0,0.51)] bg-linear-to-r from-[#00A6FF] to-[#045595]'
                    : 'p-0.5 rounded-[15px] bg-linear-to-r from-[#00A6FF] to-[#045595] cursor-pointer'
                }
              >
                {({ isActive }) =>
                  !isActive ? (
                    <div className="bg-[#001826] w-[195px] h-[55px] rounded-[15px] flex items-center justify-center font-bold text-2xl text-white hover:bg-[#045595]">
                      Upcoming
                    </div>
                  ) : (
                    'Upcoming'
                  )
                }
              </NavLink>
            </div>

            {/* Genre Filter */}
            {/* <form action="/movies/view" method="get"> */}
            <div className="relative inline-flex text-2xl w-[225px] h-[55px] rounded-[15px] p-0.5 bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)]">
              <div
                ref={dropdownRef}
                className="relative flex items-center bg-[#001826] rounded-[15px] px-3 py-2 text-white w-[220px] shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              >
                <ListFilter className="size-7 mr-2" />

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex justify-between cursor-pointer items-center w-full text-left font-bold"
                >
                  {selected}
                  {isOpen ? <ChevronUp className="size-6" /> : <ChevronDown className="size-6" />}
                </button>

                {isOpen && (
                  <ul className="absolute top-[60px] left-0 w-full bg-[#001826] border border-[#00A6FF] rounded-[10px] shadow-md z-10 overflow-hidden">
                    {options.map(option => (
                      <li
                        key={option}
                        className={`px-4 py-2 rounded-2xl mx-2 my-2 cursor-pointer text-white font-semibold 
                            ${
                              selected === option
                                ? 'bg-linear-to-r from-[#00A6FF] to-[#045595]'
                                : 'hover:bg-linear-to-r from-[#00A6FF] to-[#045595]'
                            }`}
                        onClick={() => {
                          setSelected(option)
                          setIsOpen(false)
                          handleGenreChange({ target: { value: option === 'None' ? '' : option } })
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* </form> */}
          </div>

          {/* {message && (
            <div
              className="fixed bottom-8 right-8 z-50
               bg-[#001826] text-white text-lg font-semibold
               border border-[#00A6FF]
               shadow-[0_0_10px_rgba(0,166,255,0.5)]
               px-6 py-3 rounded-xl
               animate-[fadeInOut_3s_ease_forwards]
               bg-linear-to-r from-[#00A6FF]/20 to-[#045595]/20
               backdrop-blur-md"
            >
              {message}
            </div>
          )} */}
          <MessagePopup message={message}></MessagePopup>
          {/* Movie Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-20">
            {listMovie.map(movie => (
              <div
                key={movie.movieId}
                className="col"
                tabIndex="0"
                aria-label={`${movie.name} - ${movie.genres.slice(0, 2).join(' / ')} - ${
                  movie.duration
                }`}
              >
                <div className="movie-card">
                  <NavLink to={`/detail-film/${movie.movieId}`}>
                    <img
                      src={movie.posterUrl || '/images/MufasaCOVER.jpg'}
                      alt={movie.name}
                      // alt="Mufasa"
                      className="w-full h-auto rounded-lg shadow-md hover:scale-105 hover:shadow-[0_0_20px_#00A6FF] transform transition-transform duration-300"
                    />
                  </NavLink>
                  <div className="flex gap-1.5 justify-center text-center text-white text-lg font-bold mt-3">
                    {/* Genres */}
                    <span>
                      {movie.genres && movie.genres.length > 0
                        ? movie.genres.slice(0, 2).join(' / ')
                        : 'N/A'}
                      {/* Action */}
                    </span>
                    <span>•</span>
                    {/* <span>2h 32m</span> */}
                    <span>{movie.duration}</span>
                    <span>•</span>
                    <span className="age bg-linear-to-r from-[#00A6FF] to-[#045595] text-xs px-2 py-1 rounded">
                      {movie.age || 'N/A'}
                      {/* 13+ */}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section>
        <Footer />
      </section>
    </div>
  )
}

export default DaftarFilm
