import React from 'react'
import { User } from "lucide-react";

function NavbarAdmin() {
  return (
    <header className="w-full h-32 flex items-center justify-between bg-transparent">
      <img 
        src="/images/CinemateLogo.png" 
        alt="Cinemate Logo" 
        className="h-16 ml-4.5"
      />

      <button className="p-2 mr-5 rounded-full cursor-pointer border border-white hover:bg-white hover:text-gray-900 transition">
        <User className="size-5 " />
      </button>
    </header>
  )
}

export default NavbarAdmin
