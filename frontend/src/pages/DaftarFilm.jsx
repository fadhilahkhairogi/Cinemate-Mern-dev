import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'

function DaftarFilm() {
  const [listMovie, setListMovie] = useState(null)
  const [message, setMessage] = useState('')

  // Fetch movie list on component mount
  useEffect(() => {
    fetchMovieList()
  }, [])

  const fetchMovieList = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/movies/daftar-film', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      setListMovie(data.movies)
    } catch (error) {
      console.error(error)
      setMessage('Error connecting to server')
    }
  }

  if (!listMovie) return <p>Loading movies...</p>
  if (message) return <p>{message}</p>

  return (
    <div>
      {/* NAVBAR */}
      <section className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </section>

      {/* MOVIE */}
      <section
        className="bg-cover bg-center py-4"
        style={{
          backgroundImage: "url('/images/BG.png')",
          paddingTop: '80px',
          paddingBottom: '60px',
        }}
      >
        <div className="container mx-auto py-4">
          <div className="flex justify-between mb-5">
            <div>
              <button className="btn-primary mr-4">Now Showing</button>
              <button className="btn-outline">Upcoming</button>
            </div>
            <form action="/movies/view" method="get" className="flex items-center space-x-3">
              <label htmlFor="filter-genre" className="text-white font-bold text-lg">
                <i className="bi bi-funnel-fill"></i> Genre
              </label>
              <select
                id="filter-genre"
                className="form-select bg-dark text-white"
                name="filter-genre"
              >
                <option value="">None</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="horror">Horror</option>
                <option value="animation">Animation</option>
                <option value="fantasy">Fantasy</option>
              </select>
            </form>
          </div>

          {/* Movie Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
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
                      className="w-full h-auto rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300"
                    />
                  </NavLink>
                  <div className="text-center font-bold mt-3">
                    {/* Genres */}
                    <span className="text-sm  text-white">
                      {movie.genres && movie.genres.length > 0
                        ? movie.genres.slice(0, 2).join(' / ')
                        : 'N/A'}
                    </span>
                    <span className="mx-1 text-white">•</span>
                    <span className="text-sm text-white">{movie.duration}</span>
                    <span className="mx-1 text-white">•</span>
                    <span className="age bg-gradient-to-r from-blue-500 to-indigo-700 text-xs px-2 py-1 rounded text-white">
                      {movie.age || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section>
        <Footer />
      </section>
    </div>
  )
}

export default DaftarFilm
