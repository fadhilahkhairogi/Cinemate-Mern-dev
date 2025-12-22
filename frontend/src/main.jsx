import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router'
import App from './App.jsx'
import './index.css'
import Test from './pages/Test.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Help from './pages/Help.jsx'
import Home from './pages/Home.jsx'
import DetailFilm from './pages/DetailFilm.jsx'
import DaftarFilm from './pages/DaftarFilm.jsx'
import Profil from './pages/Profil.jsx'
import Payment from './pages/Payment.jsx'
import Order from './pages/Order.jsx'
import FnB from './pages/FnB.jsx'
import AdminFilm from './pages/AdminFilm.jsx'
import AdminFnB from './pages/AdminFnB.jsx'
import AdminPembelian from './pages/AdminPembelian.jsx'
import AdminPengguna from './pages/AdminPengguna.jsx'
import HistoriPemesanan from './pages/HistoriPemesanan.jsx'

import ProtectedRoute from './middleware/ProtectedRoute'
import AdminRoute from './middleware/AdminRoute'
import SuperAdminRoute from './middleware/SuperAdminRoute'


const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-film"
        element={
          <AdminRoute>
            <AdminFilm />
          </AdminRoute>
        }
      />

      <Route
        path="/admin-fnb"
        element={
          <AdminRoute>
            <AdminFnB />
          </AdminRoute>
        }
      />

      <Route
        path="/admin-pembelian"
        element={
          <AdminRoute>
            <AdminPembelian />
          </AdminRoute>
        }
      />

      <Route
        path="/admin-pengguna"
        element={
          <SuperAdminRoute>
            <AdminPengguna />
          </SuperAdminRoute>
        }
      />

      <Route path="/" element={<App />} />
      <Route path="/test" element={<Test />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail-film/:movieId" element={<DetailFilm />} />
      <Route path="/daftar-film" element={<DaftarFilm />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/histori-pesanan" element={<HistoriPemesanan />} />
      <Route path="/payment/:orderId" element={<Payment />} />
      <Route path="/detail-film/:movieId/order/:scheduleId" element={<Order />} />
      <Route path="/fnb" element={<FnB />} />
      <Route path="admin-film" element={<AdminFilm />} />
      <Route path="admin-fnb" element={<AdminFnB />} />
      <Route path="admin-pembelian" element={<AdminPembelian />} />
      <Route path="admin-pengguna" element={<AdminPengguna />} />
      <Route path="/help" element={<Help />} />
    </Routes>

    {/* <Nav>
      <Link to="/login"></Link>
      <Link to="/register"></Link>
    </Nav> */}
  </BrowserRouter>
)
