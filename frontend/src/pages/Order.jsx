import React, { useState } from "react";
import Navbar2 from '../components/share/Navbar2'
import Footer from '../components/share/Footer'
import { CirclePlus, ShoppingBasket, Ticket } from "lucide-react";
function Order() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const handlePickSeat = () => {
    const checkedSeats = Array.from(
      document.querySelectorAll(".seat-checkbox:checked")
    ).map((checkbox) => checkbox.value);

    setSelectedSeats(checkedSeats);
    setTotalPrice(checkedSeats.length * 45000);
    };
  return (
    <div className="bg-[#00A6FF]">
      <section
        className="relative flex items-end min-h-screen"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.85) 13%, rgba(0,0,0,0.57) 50%, rgba(0,0,0,1) 100%)',
        }}
      >
        {/* NAVBAR */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar2 />
        </div>
        
        <div className="p-6 sm:p-10 md:p-20 lg:p-[260px] mx-auto my-auto">
          <div className="items-center w-full justify-center">
        {/* Container */}
            <div className="scale-110 sm:scale-115 md:scale-120 lg:scale-125 transform origin-top">
            <div className="bg-linear-to-b from-[#00A3FB] to-[#045797] rounded-[20px] p-4">
                <form method="post">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Left Panel */}
                        <div className="md:col-span-5 bg-gray-100 text-black rounded-[15px] p-4 sm:p-5">
                            <div className="bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] rounded-[11px] mb-4 text-white pb-2">
                                <label className="flex text-center justify-center px-4 pt-4 font-bold">
                                    Select Seats
                                </label>
                            </div>

                            {/* Information */}
                            <div className="flex flex-wrap gap-3 mb-3 font-semibold justify-between text-sm sm:text-base">
                                <div className="flex items-center">
                                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#D9D9D9] rounded mr-2" />{" "}
                                    Available
                                </div>
                                <div className="flex items-center">
                                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#697079] rounded mr-2" />{" "}
                                    Taken
                                </div>
                                <div className="flex items-center">
                                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-linear-to-r from-[#00A6FF] to-[#045595] rounded mr-2" />{" "}
                                    Selected
                                </div>
                            </div>

                            <div className="text-center font-bold text-[#697079] bg-[#D9D9D9] rounded mb-2 py-1 text-sm sm:text-base">
                            SCREEN
                            </div>

                            {/* Seat Number Row */}
                            <div className="overflow-x-auto mb-2">
                                <div className="flex items-center mb-1 font-bold text-sm sm:text-base">
                                    <div className="w-5 mr-2" />
                                    {[...Array(10)].map((_, i) => {
                                    const seatIndex = i + 1;
                                    const isAfterGap = seatIndex === 3 || seatIndex === 7;
                                    return (
                                        <React.Fragment key={`num-${seatIndex}`}>
                                        <div className="w-6 m-1 text-center text-[#697079]">
                                            {seatIndex}
                                        </div>
                                        {isAfterGap && <div className="w-6 m-1" />}
                                        </React.Fragment>
                                    );
                                    })}
                                    </div>

                                    {/* Seat Rows */}
                                    {["A", "B", "C", "D", "E", "F", "G"].map((row) => (
                                    <div key={row} className="flex items-center mb-1 text-sm">
                                    <span className="w-5 font-bold mr-2 text-[#697079]">{row}</span>
                                    {[...Array(10)].map((_, i) => {
                                        const seatIndex = i + 1;
                                        const isAfterGap = seatIndex === 3 || seatIndex === 7;
                                        return (
                                        <React.Fragment key={`${row}${seatIndex}`}>
                                            <input
                                            type="checkbox"
                                            value={`${row}${seatIndex}`}
                                            className="seat-checkbox appearance-none w-5 h-5 sm:w-6 sm:h-6 m-1 bg-[#D9D9D9] border border-gray-300 rounded cursor-pointer checked:bg-linear-to-br checked:from-[#00A3FB] checked:to-[#045797]"
                                            />
                                            {isAfterGap && <div className="w-6 m-1" />}
                                        </React.Fragment>
                                        );
                                    })}
                                    </div>
                                ))}
                                </div>

                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={handlePickSeat}
                                    className="bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] text-white font-bold w-full sm:w-1/2 mt-4 p-2.5 rounded-[15px] cursor-pointer text-2xl sm:text-base hover:bg-none hover:bg-[#045595]"
                                >
                                    PICK SEAT
                                </button>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="md:col-span-7 text-white rounded-[15px] p-4 sm:p-6 space-y-4">
                            <h1 className="flex items-center text-xl sm:text-2xl font-bold mb-2">
                            <Ticket className="mr-2 size-7" /> Detail Tickets
                            </h1>
                            {/* Movie */}
                            <div>
                                <label className="block mb-1 font-semibold">Movie</label>
                                <input
                                    className="bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base"
                                    readOnly
                                    // value={title}
                                    value={"spiderwoman"}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Date */}
                                <div>
                                    <label className="block mb-1 font-semibold">Date</label>
                                    <input
                                    readOnly
                                    value={"20/13/2025"}
                                    //   value={selectedDate}
                                    //   onChange={(e) => setSelectedDate(e.target.value)}
                                    //   min={today}
                                    className="bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base"
                                    />
                                </div>
                                {/* Time */}
                                <div>
                                    <label className="block mb-1 font-semibold">Time</label>
                                    <input
                                    readOnly
                                    value={"14.00"}
                                    //   value={selectedTime}
                                    //   onChange={(e) => setSelectedTime(e.target.value)}
                                    className="bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Selected Seats */}
                                <div>
                                    <label className="block mb-1 font-semibold">Selected Seats</label>
                                    <input
                                    className="bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base"
                                    readOnly
                                    value={
                                        selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"
                                    }
                                    />
                                </div>
                                {/* Cinema */}
                                <div>
                                    <label className="block mb-1 font-semibold">Cinema</label>
                                    <input
                                    className="bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base"
                                    readOnly
                                    value={"XXI Bandung"}
                                    />
                                </div>
                            </div>

                            {/* Estimated Price */}
                            <div>
                                <label className="block mb-1 font-semibold">Estimated Price</label>
                                <input
                                    className="bg-white w-full p-2 rounded-[10px] font-medium text-black text-sm sm:text-base"
                                    readOnly
                                      value={`Rp. ${totalPrice.toLocaleString("id-ID")}`}
                                />
                            </div>

                            {/* CHECKOUT */}
                            <button
                            type="button"
                            //   onClick={handlePayment}
                            className="relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]">
                            <ShoppingBasket className="absolute left-5 w-[23px] sm:w-[25px] h-[23px] sm:h-[25px]"/>
                            CHECKOUT
                            </button>
                            {/* OR */}
                            <h2 className="font-bold flex justify-center">OR</h2>
                            {/* ADD FNB */}
                            <button
                            type="button"
                            //   onClick={handlePayment}
                            className="relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]">
                            <CirclePlus className="absolute left-5 w-[23px] sm:w-[25px] h-[23px] sm:h-[25px]"/>
                            Add Food & Beverage
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>
      </section>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Order