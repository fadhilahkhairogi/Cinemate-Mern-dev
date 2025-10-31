import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import DetailFilm from './pages/DetailFilm.jsx'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detail-film/:movieId" element={<DetailFilm />} />
      {/* <Route path="/detail-film" element={<DetailFilm />} /> */}
    </Routes>

    {/* <Nav>
      <Link to="/login"></Link>
      <Link to="/register"></Link>
    </Nav> */}
  </BrowserRouter>
)
