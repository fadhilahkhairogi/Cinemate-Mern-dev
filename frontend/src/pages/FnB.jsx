import React, { useState } from "react";
import Navbar2 from "../components/share/Navbar2";
import FnbCard from "../components/core/FnbCard";
import Footer from "../components/share/Footer";

function FnB() {
  const [qtyMap, setQtyMap] = useState({});

  const increment = (id) => {
    setQtyMap((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id) => {
    setQtyMap((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  const combo = [
    { id: 1, image: "/images/combo1.png", name: "Paket Couple 1", desc: "1 Popcorn (M), 1 Pepsi", price: "Rp50,000" },
    { id: 2, image: "/images/combo1.png", name: "Paket Couple 1", desc: "1 Popcorn (M), 1 Pepsi", price: "Rp50,000" },
    { id: 3, image: "/images/combo2.png", name: "Paket Couple 1", desc: "1 Popcorn (M), 2 Pepsi", price: "Rp70,000" },
    { id: 4, image: "/images/combo2.png", name: "Paket Couple 1", desc: "1 Popcorn (M), 2 Pepsi", price: "Rp70,000" },
    { id: 5, image: "/images/combo2.png", name: "Paket Couple 1", desc: "1 Popcorn (M), 2 Pepsi", price: "Rp70,000" },
  ];

  const drink = [
    { id: 10, image: "/images/drink1.png", name: "Coca Cola", desc: "Cold Drink", price: "Rp25,000" },
    { id: 11, image: "/images/drink2.png", name: "Coca Cola", desc: "Cold Drink", price: "Rp25,000" },
    { id: 12, image: "/images/drink3.png", name: "Coca Cola", desc: "Cold Drink", price: "Rp25,000" },
    { id: 13, image: "/images/drink3.png", name: "Coca Cola", desc: "Cold Drink", price: "Rp25,000" },
    { id: 14, image: "/images/drink3.png", name: "Coca Cola", desc: "Cold Drink", price: "Rp25,000" },
  ];

  const snack = [
    { id: 20, image: "/images/snack1.png", name: "French Fries", desc: "Crispy Snack", price: "Rp30,000" },
    { id: 21, image: "/images/snack2.png", name: "French Fries", desc: "Crispy Snack", price: "Rp30,000" },
    { id: 22, image: "/images/snack3.png", name: "French Fries", desc: "Crispy Snack", price: "Rp30,000" },
    { id: 23, image: "/images/snack3.png", name: "French Fries", desc: "Crispy Snack", price: "Rp30,000" },
    { id: 24, image: "/images/snack3.png", name: "French Fries", desc: "Crispy Snack", price: "Rp30,000" },
  ];

  const parsePrice = (p) => Number(p.replace(/Rp|\.|,/g, ""));

  const allProducts = [...combo, ...drink, ...snack];

  const total = allProducts.reduce((sum, item) => {
    const qty = qtyMap[item.id] || 0;
    return sum + qty * parsePrice(item.price);
  }, 0);

  const handleCheckout = () => {
    const selectedItems = allProducts
      .filter((item) => qtyMap[item.id] > 0)
      .map((item) => ({
        ...item,
        qty: qtyMap[item.id],
      }));
  };

  return (
    <div className="bg-[#00A6FF] min-h-screen">
      <section
        className="relative flex min-h-screen justify-center items-center py-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 13%, rgba(0,0,0,0.57) 50%, rgba(0,0,0,1) 100%)",
        }}
      >
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar2 />
        </div>

        <div className="p-1.5 rounded-3xl bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_60px_rgba(0,0,0,0.35)] w-full mx-[148px] max-w-[1420px] my-44">
          <div className="bg-white shadow-[inset_0px_4px_50px_5px_rgba(0,0,0,0.50),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)] rounded-3xl p-6 sm:p-8 lg:p-10">

            <div className="flex items-center gap-3 mb-8">
              <div className="flex text-white gap-4 bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] rounded-xl p-3">
                <img src="/icons/icon-fnb.svg" alt="icon" className="size-9" />
                <h1 className="text-3xl font-bold">Select Food & Beverage</h1>
              </div>
            </div>

            <FnbCard title="COMBO" products={combo} qtyMap={qtyMap} increment={increment} decrement={decrement} />
            <FnbCard title="DRINK" products={drink} qtyMap={qtyMap} increment={increment} decrement={decrement} />
            <FnbCard title="SNACK" products={snack} qtyMap={qtyMap} increment={increment} decrement={decrement} />

            <div className="mt-10 flex flex-col sm:flex-row justify-between items-center bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-2xl p-5 border-2 border-[#00A6FF]">
              <p className="text-2xl font-bold">
                Total Price:{" "}
                <span className="font-medium text-black">
                  Rp{total.toLocaleString("id-ID")}
                </span>
              </p>

              {/* <button
                onClick={handleCheckout}
                className="mt-4 sm:mt-0 bg-linear-to-r from-[#00A6FF] to-[#045595] text-white text-2xl font-semibold px-10 py-3 rounded-xl hover:bg-none hover:bg-[#045595] active:scale-95 cursor-pointer shadow-[0_0_9px_rgba(0,0,0,0.51)]"
              >
                CHECKOUT
              </button> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FnB;
