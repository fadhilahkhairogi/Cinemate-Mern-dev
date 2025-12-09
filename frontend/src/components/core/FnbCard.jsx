import React, { useState } from "react";

function FnbCard({ title, products, qtyMap, increment, decrement }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index + 4 < products.length) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="my-6">
      <h5 className="flex items-center gap-1 font-semibold mb-2 text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        <span
          className="text-transparent font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          style={{
            background:
              "linear-gradient(0deg, rgba(4,85,149,1) 0%, rgba(0,166,255,1) 50%, rgba(4,85,149,1) 100%)",
            WebkitBackgroundClip: "text",
          }}
        >
          |
        </span>
        <span className="leading-tight text-left font-bold text-2xl">
          {title}
        </span>
      </h5>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-2 top-0 h-full w-15 rounded-3xl bg-linear-to-r from-black/30 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-2 top-0 h-full w-15 rounded-3xl bg-linear-to-l from-black/30 to-transparent z-20 pointer-events-none"></div>

        {index > 0 && (
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-transparent p-3 cursor-pointer"
          >
            <img
              src="/icons/icon-leftArrow.svg"
              className="size-10 hover:scale-105 active:scale-100"
            />
          </button>
        )}

        {index + 4 < products.length && (
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-transparent p-3 cursor-pointer"
          >
            <img
              src="/icons/icon-rightArrow.svg"
              className="size-10 hover:scale-105 active:scale-100"
            />
          </button>
        )}

        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${index * (100 / 4)}%)`,
            width: `${(products.length / 5) * 100}%`,
          }}
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="w-[70%] sm:w-[50%] md:w-[33%] lg:w-[25%] shrink-0 px-2"
            >
              <div className="flex items-center gap-4 rounded-3xl border border-[#00A6FF] shadow-[inset_0px_4px_15px_0px_rgba(0,0,0,0.25)] bg-white p-4">
                <img
                  src={item.image}
                  className="w-24 h-24 object-contain rounded-xl"
                />

                <div className="flex flex-col grow">
                  <h3 className="text-lg sm:text-xl font-bold">{item.name}</h3>
                  <p className="text-sm sm:text-base">{item.desc}</p>
                  <p className="my-2 font-semibold sm:text-lg">{item.price}</p>

                  <div className="flex flex-col items-end justify-center mt-auto">
                    <div className="flex items-center rounded-3xl bg-[#D9D9D9] gap-0.5 w-fit">
                      <button
                        onClick={() => decrement(item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-white text-xl cursor-pointer"
                      >
                        <img
                          src="/icons/icon-minusCricle.svg"
                          className="size-full hover:scale-105 active:scale-100"
                        />
                      </button>

                      <span className="text-2xl font-bold w-5 text-center">
                        {qtyMap[item.id] || 0}
                      </span>

                      <button
                        onClick={() => increment(item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-white text-xl cursor-pointer"
                      >
                        <img
                          src="/icons/icon-plusCircle.svg"
                          className="size-full hover:scale-105 active:scale-100"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FnbCard;
