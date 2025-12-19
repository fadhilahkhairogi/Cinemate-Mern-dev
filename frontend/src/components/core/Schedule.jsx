import React, { useState } from 'react'
import { CalendarDays } from 'lucide-react'

const Schedule = ({ schedules }) => {
  const day = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(day)

  if (!schedules || schedules.length === 0) return <p>No schedules</p>

  const theaters = schedules.map(schedule => {
    const today = new Date(selectedDate)
    const dayOfWeek = today.getDay()
    let price
    if (dayOfWeek >= 1 && dayOfWeek <= 4) price = schedule.priceWeekday
    else if (dayOfWeek === 5) price = schedule.priceFriday
    else price = schedule.priceWeekend

    const times = []

    if (Array.isArray(schedule.schedules)) {
      schedule.schedules.forEach(t => {
        if (!t.startTime) return

        // Parse UTC time directly
        const jsDate = new Date(t.startTime)

        // Convert to Jakarta timezone date for comparison
        const localDate = jsDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' }) // 'YYYY-MM-DD'

        if (localDate === selectedDate) {
          // Convert to Jakarta local time string
          const localTime = jsDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Jakarta',
          })
          times.push(localTime)

          console.log({
            originalUTC: t,
            jsDate,
            localDate,
            localTime,
            selectedDate,
          })
        }
      })
    } else {
      console.log('Schedulenya belum jalan mas')
    }
    return { name: schedule.cinemaName, price, times }
  })

  // for (const schedule of schedules) {
  //   theaters.push({
  //     name: schedule.cinemaName,
  //     price: (() => {
  //       if (day >= 1 && day <= 4) return schedule.priceWeekday
  //       else if (day === 5) return schedule.priceFriday
  //       else return schedule.priceWeekend
  //     })(),
  //     times: schedule.startTime.map(t =>
  //       new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //     ),
  //   })
  // }
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
                  min={day}
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
                    <img src="/icons/icon-star.svg" alt="star" className="size-6 sm:size-7" />
                    <span className="text-[#EAB308] font-semibold text-lg sm:text-xl">
                      {/* {theater.rating} */}
                      4.5
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
