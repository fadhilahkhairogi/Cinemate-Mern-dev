import React from 'react'
import { Film, ShoppingBasket } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-72 z-10 bg-white shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)] 
        p-5 flex flex-col rounded-r-2xl">

      <div className="space-y-4 mt-3">

        {/* DATA PEMBELIAN */}
        <button
          onClick={() => navigate("/admin-pembelian")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white shadow-md
            ${isActive("/admin-pembelian")
              ? "bg-[#045595] cursor-not-allowed"
              : "cursor-pointer bg-linear-to-r from-[#00A6FF] to-[#045595] hover:bg-none hover:bg-[#045595]"
            }`}
        >
          <ShoppingBasket className="size-6" />
          <span className="font-medium text-lg">Data Pembelian</span>
        </button>

        {/* DATA FILM */}
        <button
          onClick={() => navigate("/admin-film")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white shadow-md
            ${isActive("/admin-film")
              ? "bg-[#045595] cursor-not-allowed"
              : "cursor-pointer bg-linear-to-r from-[#00A6FF] to-[#045595] hover:bg-none hover:bg-[#045595]"
            }`}
        >
          <Film className="size-6" />
          <span className="font-medium text-lg">Data Film</span>
        </button>

        {/* DATA F&B */}
        <button
          onClick={() => navigate("/admin-fnb")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white shadow-md
            ${isActive("/admin-fnb")
              ? "bg-[#045595] cursor-not-allowed"
              : "cursor-pointer bg-linear-to-r from-[#00A6FF] to-[#045595] hover:bg-none hover:bg-[#045595]"
            }`}
        >
          <img src="/icons/icon-fnb.svg" alt="icon" className="size-6" />
          <span className="font-medium text-lg">Data F&B</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
