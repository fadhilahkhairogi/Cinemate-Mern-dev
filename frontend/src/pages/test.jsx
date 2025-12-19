import { useState } from "react";
import Navbar2 from "../components/share/Navbar2";
import Footer from "../components/share/Footer";
import { ChevronLeft } from "lucide-react";

function Test() {
  const genres = [
    "Horror","Action","Comedy","Thriller","Science",
    "Documentary","Adventure","Animation","Mystery","War",
    "Spy","Romance","Fantasy","Drama","Biography","Family",
    "Historical","Crime","Superhero","Psychological","Anthology",
    "Zombie","Survival","Space","Disaster","Futuristic",
    "Musical", "Sports", "Heist", "Western", "Medical"
  ];

  const [selected, setSelected] = useState([]);

  const toggleGenre = (g) => {
    setSelected((prev) =>
      prev.includes(g)
        ? prev.filter((x) => x !== g)
        : [...prev, g]
    );
  };

  const isDisabled = selected.length < 3;

  return (
    <div className="bg-[#00A6FF]">
      <section
        className="relative flex min-h-screen justify-center items-center"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 13%, rgba(0,0,0,0.57) 50%, rgba(0,0,0,1) 100%)",
        }}
      >
        {/* NAVBAR */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar2 />
        </div>

        {/* MAIN */}
        <div className="p-1.5 rounded-3xl bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_60px_rgba(0,0,0,0.35)] w-full mx-[148px] max-w-[1420px] my-64">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10">
            
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <button className="text-[#00A6FF] cursor-pointer absolute mb-15 hover:scale-110 active:scale-100">
                <ChevronLeft size={50} />
              </button>

              <h1 className="text-[22px] sm:text-[32px] lg:text-[40px] font-bold text-center flex-1">
                What are you interested in?
              </h1>

              <div className="w-[38px]"></div>
            </div>

            <p className="text-center text-gray-600 mt-2 text-base sm:text-lg">
              This will customize your new home feed
            </p>

            {/* GENRES BOX */}
            <div
              className="
                bg-white rounded-2xl p-6 sm:p-8 mt-8
                shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]
              "
            >
              <div className="flex flex-col gap-5">

                {(() => {
                  const rows = [];
                  let i = 0;
                  let toggle = true;

                  while (i < genres.length) {
                    const count = toggle ? 4 : 5;
                    rows.push(genres.slice(i, i + count));
                    i += count;
                    toggle = !toggle;
                  }

                  return rows.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex justify-between gap-4"
                    >
                      {row.map((item, i2) => (
                        <div
                          key={i2}
                          className={`p-0.5 rounded-xl bg-linear-to-r from-[#00A6FF] to-[#045595] 
                            transition-all
                            ${selected.includes(item) ? "scale-[1.03]" : ""}
                            flex-1
                          `}
                        >
                          <button
                            onClick={() => toggleGenre(item)}
                            className={`
                              w-full py-2 rounded-xl font-medium cursor-pointer
                              ${selected.includes(item)
                                ? "text-white bg-linear-to-r from-[#00A6FF] to-[#045595]"
                                : "bg-white hover:bg-linear-to-r from-[#00A6FF] to-[#045595] hover:text-white"}
                            `}
                          >
                            {item}
                          </button>
                        </div>
                      ))}
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* CONTINUE BUTTON */}
            <div className="flex justify-center mt-10 mb-3">
              <button
                disabled={isDisabled}
                // onClick={handleContinue}
                className={`relative flex items-center justify-center p-2.5 border-none rounded-[15px] w-[300px] mt-2.5 text-[18px] sm:text-[20px] font-semibold shadow-[0_0_9px_rgba(0,0,0,0.51)] 
                  ${isDisabled
                    ? "bg-gray-300 text-black cursor-not-allowed"
                    : "text-white bg-linear-to-r from-[#00A6FF] to-[#045595] hover:bg-none hover:bg-[#045595] cursor-pointer hover:scale-105 active:scale-100"}
                `}
              >
                {isDisabled ? "Pick 3 or more to continue" : "Continue"}
              </button>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Test;
