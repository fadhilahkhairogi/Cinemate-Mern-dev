import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router'
import App from './App.jsx'
import './index.css'
import Test from './pages/Test.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import DetailFilm from './pages/DetailFilm.jsx'
import DaftarFilm from './pages/DaftarFilm.jsx'
import Order from './pages/Order.jsx'
import FnB from './pages/FnB.jsx'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/test" element={<Test />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail-film/:movieId" element={<DetailFilm />} />
      <Route path="/daftar-film" element={<DaftarFilm />} />
      <Route path="/order" element={<Order />} />
      <Route path="/fnb" element={<FnB />} />
    </Routes>

    {/* <Nav>
      <Link to="/login"></Link>
      <Link to="/register"></Link>
    </Nav> */}
  </BrowserRouter>
)
