import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../share/Navbar";
import { CircleArrowRight, Flame } from "lucide-react";

function HomeCarousel() {
  const slides = [
    {
      id: 1,
      title: "SPIDER-MAN",
      genres: "Action/Adventure",
      duration: "2h 20m",
      banner: "/images/spidermanBG.png",
    },
    {
      id: 2,
      title: "MOANA 2",
      genres: "Action/Adventure",
      duration: "2h 20m",
      banner: "/images/moanaBg.jpg",
    },
    {
      id: 3,
      title: "SONIC 3",
      genres: "Action/Adventure",
      duration: "2h 20m",
      banner: "/images/sonicBg.png",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [current]);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length);
      setFade(true);
    }, 200);
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((c) => (c - 1 + slides.length) % slides.length);
      setFade(true);
    }, 200);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* NAVBAR */}
      <div className="absolute top-0 left-0 w-full z-40">
        <Navbar />
      </div>

      {/* SLIDES CONTAINER */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="min-w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.banner})` }}
          >
            {/* DARK GRADIENT */}
            <div className="absolute inset-0 bg-black/25"></div>
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_50%,rgba(0,0,0,1)_100%)]"></div>

            {/* TEXT CONTENT */}
            <div className={` absolute inset-0 flex flex-col justify-center text-white px-6 sm:px-10 md:px-20 lg:px-[148px] w-full transition-opacity duration-700
                ${fade ? "opacity-100" : "opacity-0"}`}
            >
              {/* BADGE */}
              <p className=" flex items-center font-semibold px-3 py-1.5 sm:px-4 sm:py-2 w-fit rounded-lg text-white text-xs sm:text-sm md:text-base bg-linear-to-r from-[#fd1d1d] to-[#fcb045] shadow-[0_0_9px_rgba(0,0,0,0.51)]">
                <Flame className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> #1 TOP RATINGS
              </p>

              {/* TITLE */}
              <h1 className=" mt-3 sm:mt-4 font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                {slide.title}
              </h1>

              {/* GENRES & DURATION */}
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl mt-1 sm:mt-2">
                {slide.genres} • {slide.duration}
              </p>

              {/* BUTTON */}
              <button className=" flex items-center font-semibold rounded-lg cursor-pointer px-3 py-2 sm:px-4 sm:py-2.5 mt-3 text-sm sm:text-base md:text-lg lg:text-2xl bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595] w-fit hover:scale-105 active:scale-100"
                onClick={() => navigate(`/detail-film/${slide.id}`)}
              >
                View Details
                <CircleArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9"/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -translate-y-1/2 left-0 z-30 p-2 sm:p-3 md:p-4 lg:p-5 cursor-pointer "
      >
        <img
          src="/icons/icon-leftArrow.svg"
          className="opacity-80 hover:opacity-100 transition w-6 sm:w-8 md:w-10 lg:w-12 hover:scale-105 active:scale-100"
        />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 -translate-y-1/2 right-0 z-30 p-2 sm:p-3 md:p-4 lg:p-5 cursor-pointer"
      >
        <img
          src="/icons/icon-rightArrow.svg"
          className="opacity-80 hover:opacity-100 transition w-6 sm:w-8 md:w-10 lg:w-12 hover:scale-105 active:scale-100"
        />
      </button>


      {/* DOT INDICATORS */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all
              ${i === current ? "bg-white scale-125" : "bg-white/40"}`}
          />
        ))}
      </div>

    </div>
  );
}

export default HomeCarousel;
