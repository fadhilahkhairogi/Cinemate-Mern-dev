import React, { useState, useEffect } from 'react'
import Footer from '../components/share/Footer'
import Navbar2 from '../components/share/Navbar2'
import MessagePopup from '../components/MessagePopup'
import { useParams, useNavigate } from 'react-router'

function Payment() {
  const [order, setOrder] = useState(null)
  const [name, setName] = useState('')
  const { orderId } = useParams()
  const [message, setMessage] = useState('')
  const [date, setDate] = useState(null)
  const [price, setPrice] = useState(0)
  const [time, setTime] = useState(null)
  const token = localStorage.getItem('token')

  // console.log('Frontend: Movie ID from params:', movieId)

  useEffect(() => {
    if (orderId) {
      fetchPaymentDetail(orderId)
    }
  }, [orderId])

  const fetchPaymentDetail = async orderId => {
    try {
      const res = await fetch(`http://localhost:3000/api/payment/detail/${orderId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        Authorization: `Bearer ${token}`,
      })

      const data = await res.json()
      // console.log('Frontend received order:', data.order)

      const utcDate = new Date(data.order.schedule.startTime)

      const jakartaDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))
      setDate(jakartaDate.toLocaleDateString('id-ID'))
      setTime(
        jakartaDate.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      )
      setPrice(data.order.totalPrice)
      setOrder(data.order)
    } catch (error) {
      console.error(error)
      setMessage('Error connecting to server')
    }
  }

  const handlePay = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId: order.orderId }),
      })

      const paymentToken = await res.json() // <-- di sini
      window.snap.pay(paymentToken.token, {
        // <-- dan di sini

        onSuccess: function (result) {
          console.log(result)
          setMessage('Pembayaran berhasil, mengalihkan...')
          setTimeout(() => {
            window.location.href = 'http://localhost:5173/daftar-film'
          }, 1000)
        },
        onPending: function (result) {
          console.log(result)
          setTimeout(() => {
            window.location.href = 'http://localhost:5173/daftar-film'
          }, 1000)
        },
        onError: function (result) {
          console.log(result)
          setTimeout(() => {
            window.location.href = 'http://localhost:5173/daftar-film'
          }, 1000)
        },
      })
    } catch (err) {
      console.error(err)
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
        {/* content */}
        <div className="px-6 md:px-12 lg:px-40 py-36 w-full flex flex-col lg:flex-row gap-10 relative z-10 text-white">
          {/* title */}
          <div className="flex-1 space-y-8 max-w-4xl">
            <h1 className="text-4xl font-semibold mb-6">Pembayaran</h1>

            {/* Movie info */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-black flex justify-between flex-wrap gap-y-4">
              <div className="min-w-[250px]">
                <p className="font-semibold">Movie</p>
                {/* <p>SPIDER-MAN: ACROSS THE SPIDER-VERSE</p> */}
                <p>{order?.schedule?.movie?.name || 'SPIDER-MAN: ACROSS THE SPIDER-VERSE'}</p>
                <p className="font-semibold mt-5">Date</p>
                {/* <p>Wednesday, 25-December-2024</p> */}
                <p>{date || 'Wednesday, 25-December-2024'}</p>
                <p className="font-semibold mt-5">Cinema</p>
                {/* <p>XXI Bandung</p> */}
                <p>{order?.schedule?.cinema?.name || 'SPIDER-MAN: ACROSS THE SPIDER-VERSE'}</p>
              </div>
              <div className="min-w-[300px] text-left">
                <p className="font-semibold">Seat</p>
                <p>{order?.seats?.join(', ') || 'H4, H5, H6'}</p>
                <p className="font-semibold mt-5">Time</p>
                {/* <p>12:05</p> */}
                <p>{time || '12:05'}</p>
                <p className="font-semibold mt-5">Ticket</p>
                <p> {order?.seatCount || '3'}</p>
                <p className="font-semibold mt-5">Price</p>
                <p>{price || '90.000'}</p>
              </div>
            </div>
            {/* menu makanan */}
            {/* <div className="bg-white rounded-lg p-4 border border-blue-400 space-y-4 flex-col max-4xl"> */}
              {/* <h2 className="font-semibold mb-4 text-black">Food & Beverages</h2> */}
              {/* item 1 */}
              {/* <div className="flex justify-between items-center border border-blue-400 rounded-lg p-4">
                <div>
                  <p className="font-bold text-lg text-black">Paket Couple 1</p>
                  <p className="text-black">70.000</p>
                  <p className="font-semibold text-black">1x</p>
                </div>
                <img
                  src="/images/Rectangle 302.png"
                  alt="Paket Couple 1"
                  className="h-20 w-auto rounded-md"
                />
              </div> */}
              {/* item 2 */}
              {/* <div className="flex justify-between items-center border border-blue-400 rounded-lg p-4">
                <div>
                  <p className="font-bold text-lg text-black">Kentang (Medium)</p>
                  <p className="text-black">70.000</p>
                  <p className="text-lg font-semibold text-black">1x</p>
                </div>
                <img
                  src="/images/Rectangle 286.png"
                  alt="Kentang (Medium)"
                  className="h-20 w-auto rounded-md"
                />
              </div>*/}
            {/* </div> */}
            {/* tambah items */}
            {/* <div className="bg-white rounded-lg p-4 flex justify-between item-center max-w-4xl">
              <div>
                <p className="font-semibold text-black">Tambah Barang</p>
                <p className="text=gray-600 text-sm text-black">
                  Kamu masih bisa merubah makanan yang kamu pesan
                </p>
              </div>
              <button className="bg-blue-500 text-white rounded px-6 py-1 hover:bg-blue-600 transition">
                Tambah
              </button>
            </div> */}
          </div>
          {/* box kanan pembayaran */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-black h-80 flex flex-col lg:mt-16">
            <h2 className="font-semibold text-xl mb-4">Detail Pembayaran</h2>
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>Total Pesanan</span>
              {/* <span className="font-semibold">230.000</span> */}
              <span className="font-semibold">{price}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>Biaya Layanan</span>
              <span className="font-semibold">1.602</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>PPN</span>
              <span className="font-semibold">{Math.round((Number(price) + 1602) * 0.11)}</span>
            </div>
            <div className="flex justify-between py-3 text-lg font-bold">
              <span className="font-semibold">Total Pembayaran</span>
              {/* <span className="font-semibold">231.062</span> */}
              <span className="font-semibold">{Math.round((Number(price) + 1602) * 1.11)}</span>
            </div>
            <button
              onClick={handlePay}
              className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition mt-6 w-full"
            >
              Bayar
            </button>
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

export default Payment
