import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router'
import App from './App.jsx'
import './index.css'
import Test from './pages/Test.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import DetailFilm from './pages/DetailFilm.jsx'
import DaftarFilm from './pages/DaftarFilm.jsx'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/test" element={<Test />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detail-film/:movieId" element={<DetailFilm />} />
      <Route path="/daftar-film" element={<DaftarFilm />} />
    </Routes>

    {/* <Nav>
      <Link to="/login"></Link>
      <Link to="/register"></Link>
    </Nav> */}
  </BrowserRouter>
)
