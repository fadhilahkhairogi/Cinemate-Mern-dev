import React, { useState } from 'react'
import { CalendarDays } from 'lucide-react'

const Schedule = () => {
  const today = new Date().toISOString().split('T')[0]
  // const movieNumber = 1
  // const cinemaName = 'XXI TSM'
  const [selectedDate, setSelectedDate] = useState(today)

  // const changeDate = async e => {
  //   e.preventDefault()

  //   try {
  //     const res = await fetch('http://localhost:3000/api/detail-film/scheduke', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ selectedDate }),
  //     })

  //     const data = await res.json()

  //     // setMessage(data.message)
  //     const schedules = data.schedules
  //     theaters = []
  //     // for (const schedule of schedules) {
  //     let dict = {}

  //     dict.name = cinemaName
  //     dict.rating = 4.5
  //     dict.price = 'Rp 30.000,00'
  //     // dict.times = ['12:05', '15:05', '18:05', '20:05']
  //     dict.times = schedules
  //     theaters.push(dict)
  //     // }
  //   } catch (error) {
  //     console.error(error)
  //     setMessage('Error connecting to server')
  //   }
  // }

  // const showSchedule = async e => {
  //   e.preventDefault()

  //   try {
  //     const res = await fetch('http://localhost:3000/api/schedule', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ movieNumber, schedules }),
  //     })

  //     const data = await res.json()

  //     setMessage(data.message)
  //   } catch (error) {
  //     console.error(error)
  //     setMessage('Error connecting to server')
  //   }
  // }

  const theaters = [
    {
      name: 'CGV BEC Mall',
      rating: 4.5,
      price: 'Rp 30.000,00',
      times: ['12:05', '15:05', '18:05', '20:05'],
    },
    {
      name: 'CGV Metro Indah Mall',
      rating: 4.5,
      price: 'Rp 30.000,00',
      times: ['12:10', '15:10', '18:10', '20:10'],
    },
    {
      name: 'XXI TSM',
      rating: 4.7,
      price: 'Rp 45.000,00',
      times: ['12:05', '15:05', '18:05', '20:05'],
    },
    {
      name: 'XXI THE MATIC MALL',
      rating: 4.6,
      price: 'Rp 45.000,00',
      times: ['12:10', '15:10', '18:10', '20:10'],
    },
  ]

  return (
    <section className="bg-black py-16">
      <div className="px-6 sm:px-10 md:px-20 lg:px-[148px]">
        <div className="relative bg-white rounded-xl overflow-visible pt-14 mt-16 shadow-[inset_0px_4px_100px_10px_rgba(0,0,0,0.25)]">
          {/* Header kiri */}
          <div className="absolute -top-10 left-6 sm:left-10 z-20">
            <div className="shadow-[-7px_3px_9px_2px_rgba(0,0,0,0.25)] w-[180px] h-20 bg-linear-to-r from-[#00A6FF] to-[#045595] text-white rounded-md font-semibold text-lg flex justify-center items-center">
              <h1 className="text-[28px] sm:text-[32px] text-center">Theaters</h1>
            </div>
          </div>

          {/* Header kanan */}

          {/* <form onSubmit={changeDate} className="absolute -top-10 right-6 sm:right-10 z-20"> */}
          <div className="absolute -top-10 right-6 sm:right-10 z-20">
            <div
              className="shadow-[-7px_3px_9px_2px_rgba(0,0,0,0.25)] w-[330px] h-20 flex justify-start items-center text-white px-4 py-2 rounded-md"
              style={{
                background: 'linear-gradient(to right, #00A6FF, #045595)',
              }}
            >
              <CalendarDays className="size-17 mr-2 text-white" />
              <div className="flex flex-col">
                <label className="text-lg font-semibold">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  min={today}
                  className="bg-white text-black rounded-[10px] w-[223px] p-1.5 font-medium text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
          {/* </form> */}

          {/* Daftar Theaters */}
          <div className="px-6 sm:px-10 py-6 divide-[#00A6FF] divide-y-2">
            {theaters.map((theater, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4"
              >
                {/* Info Theater */}
                <div className="w-full sm:w-auto">
                  <h3 className="bg-linear-to-r from-[#00A6FF] to-[#045595] bg-clip-text text-transparent font-bold text-2xl sm:text-3xl flex items-center gap-2 flex-wrap">
                    {theater.name}
                    <img
                      src="src/assets/icons/icon-star.svg"
                      alt="star"
                      className="size-6 sm:size-7"
                    />
                    <span className="text-[#EAB308] font-semibold text-lg sm:text-xl">
                      {theater.rating}
                    </span>
                  </h3>
                  <p className="text-[#464C55] text-base sm:text-lg font-semibold">
                    {theater.price}
                  </p>
                </div>

                {/* Jadwal Tayang */}
                <div className="flex flex-wrap gap-[93px] justify-start sm:justify-end w-full sm:w-auto">
                  {theater.times.map((time, idx) => (
                    <button
                      key={idx}
                      className="text-sm w-[120px] h-10 font-semibold rounded-md text-white shadow-md cursor-pointer"
                      style={{
                        background: 'linear-gradient(to right, #00A6FF, #045595)',
                      }}
                      onMouseOver={e => (e.currentTarget.style.background = '#045595')}
                      onMouseOut={e =>
                        (e.currentTarget.style.background =
                          'linear-gradient(to right, #00A6FF, #045595)')
                      }
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Schedule
