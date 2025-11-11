import { Facebook, Instagram, Mail, Twitter, Youtube } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router'

function Footer() {
  return (
    <div>
      {/* FOOTER */}
      <footer
        className="text-white pt-10"
        style={{
          background: 'linear-gradient(to bottom, #000000 0%, #000000 65%, #006499 100%)',
        }}
      >
        <div className="flex flex-col justify-between w-full min-h-72 mx-auto pb-7 px-6 sm:px-10 md:px-20 lg:px-[148px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            {/* Logo & Tagline */}
            <div>
              <NavLink to="/daftar-film">
                MOVIES
                <img
                  src="/images/CinemateLogo.png"
                  alt="Cinemate Logo"
                  height="60"
                  className="mb-2 mx-auto md:mx-0 w-[120px] md:w-auto"
                />
              </NavLink>
              <p className="font-semibold text-2xl">ABSOLUTE CINEMA</p>
            </div>

            {/* Column 1 */}
            <div>
              <p>
                <NavLink to="/daftar-film" className="text-white text-[18px] hover:underline">
                  MOVIES
                </NavLink>
              </p>
              <p>
                <a href="#" className="text-white text-[18px] hover:underline">
                  F&B
                </a>
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <p>
                <a href="#" className="text-white text-[18px] hover:underline">
                  CONTACT US
                </a>
              </p>
              <p>
                <a href="#" className="text-white text-[18px] hover:underline">
                  PRIVACY POLICY
                </a>
              </p>
              <p>
                <a href="#" className="text-white text-[18px] hover:underline">
                  TERMS & CONDITIONS
                </a>
              </p>
            </div>

            {/* Column 3 */}
            <div>
              <p className="font-semibold text-[18px]">CINEMATE SUPPORT</p>
              <p className="flex items-center justify-center md:justify-start text-[18px] mt-1">
                <Mail className="mr-2" />
                Cinemate@gmail.com
              </p>
              <p className="font-semibold mt-3 text-[18px]">FOLLOW US ON</p>
              <div className="flex justify-center md:justify-start gap-4 mt-1">
                <a href="#" className="text-white text-[18px]">
                  <Instagram />
                </a>
                <a href="#" className="text-white text-[18px]">
                  <Youtube />
                </a>
                <a href="#" className="text-white text-[18px]">
                  <Facebook />
                </a>
                <a href="#" className="text-white text-[18px]">
                  <img src="src/assets/icons/icon-x.svg" className="size-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm sm:text-base mt-6">
            COPYRIGHT © <strong>CINEMATE</strong> 2025. ALL RIGHT RESERVED
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
