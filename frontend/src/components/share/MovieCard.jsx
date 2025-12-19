import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ title = "MORE MOVIES" }) {
  const navigate = useNavigate();

  const movies = [
    { id: 1, cover: "/images/MUFASACover.jpg" },
    { id: 2, cover: "/images/SonicCover.jpg" },
    { id: 3, cover: "/images/moana2Cover.jpg" },
    { id: 4, cover: "/images/babyJohnCover.jpg" },
    { id: 5, cover: "/images/werewolfCover.jpg" },
    { id: 6, cover: "/images/almaCover.jpg" },
    { id: 7, cover: "/images/gangnamCover.jpg" },
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    if (index + 5 < movies.length) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const goToDetail = (id) => {
    navigate(`/detail-film/${id}`);
  };

  return (
    <div className="px-6 sm:px-10 md:px-20 lg:px-[148px] mx-auto my-10">

        {/* MOVIE CARD TITLE */}
        <h5 className="flex items-center gap-2 font-semibold mb-4 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            <span className="text-transparent font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{
                background:
                    "linear-gradient(0deg, rgba(4,85,149,1) 0%, rgba(0,166,255,1) 50%, rgba(4,85,149,1) 100%)",
                WebkitBackgroundClip: "text",
                }}
            >
                |
            </span>
            <span className="leading-tight text-left">
                {title}
            </span>
        </h5>


      <div className="relative w-full overflow-hidden">

        {/* BLUR EFFECT */}
        <div className="absolute left-0 top-0 h-full w-16 bg-linear-to-r from-black to-transparent z-20 pointer-events-none rounded-lg"></div>

        <div className="absolute right-0 top-0 h-full w-16 bg-linear-to-l from-black to-transparent z-20 pointer-events-none rounded-lg"></div>
        
        {/* PREV BUTTON */}
        {index > 0 && (
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/70 p-3 rounded-full hover:bg-black transition cursor-pointer"
          >
            <img src="/icons/icon-leftArrow.svg" className="w-5 h-5" />
          </button>
        )}

        {/* NEXT BUTTON */}
        {index + 5 < movies.length && (
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/70 p-3 rounded-full hover:bg-black transition cursor-pointer"
          >
            <img src="/icons/icon-rightArrow.svg" className="w-5 h-5" />
          </button>
        )}

        {/* SLIDER */}
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${index * (100 / 5)}%)`,
            width: `${(movies.length / 7) * 100}%`,
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="w-[20%] shrink-0 px-2">
              <img
                src={movie.cover}
                onClick={() => goToDetail(movie.id)}
                className="cursor-pointer rounded-lg shadow w-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
