import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CirclePlay, Ticket } from 'lucide-react'
import Schedule from '../components/Schedule'

function DetailFilm() {
  return (
    <div className="bg-black text-white">
      {/* NAVBAR */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* HERO SECTION */}
      <section
        className="relative aspect-video flex items-end text-white"
        style={{
          background:
            "url('src/assets/images/spidermanBG.png') center/cover no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_50%,rgba(0,0,0,1)_100%)]"></div>

        <div className="relative z-10 pb-10 sm:pb-16 md:pb-20 flex flex-col md:flex-row items-start gap-8 px-6 sm:px-10 md:px-20 lg:px-[148px]">
          <img
            src="src/assets/images/SpidermanCover.jpg"
            alt="Spider-Man Poster"
            className="rounded-lg w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] shadow-lg mx-auto md:mx-0"
          />

          <div className="md:ml-14">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight">
              SPIDER-MAN:{' '}
              <span className="font-light block sm:inline">
                ACROSS THE SPIDER-VERSE
              </span>
            </h1>

            <p className="mt-3 text-gray-200 text-base sm:text-lg md:text-2xl max-w-[900px]">
              After reuniting with Gwen Stacy, Brooklyn's full-time, friendly
              neighborhood Spider-Man is catapulted across the Multiverse, where
              he encounters a team of Spider-People charged with protecting its
              very existence. However, when the heroes clash on how to handle a
              new threat, Miles finds himself pitted against the other Spiders.
              He must soon redefine what it means to be a hero so he can save
              the people he loves most.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {/* WATCH TRAILER */}
              <a
                href="#"
                className="flex items-center font-semibold px-4 py-2 rounded-lg shadow text-white text-sm sm:text-base"
                style={{
                  background: 'linear-gradient(to right, #00A6FF, #045595)',
                  boxShadow: '-1px 0px 9px 0px rgba(0,0,0,0.51)',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#045595')}
                onMouseOut={(e) =>
                  (e.currentTarget.style.background =
                    'linear-gradient(to right, #00A6FF, #045595)')
                }
              >
                <CirclePlay className="mr-2" /> Watch Trailer
              </a>

              {/* BUY TICKET - scroll to Schedule */}
              <a
                href="#schedule"
                className="flex items-center font-semibold px-4 py-2 rounded-lg shadow text-white text-sm sm:text-base scroll-smooth"
                style={{
                  background: 'linear-gradient(to right, #07EF3C, #28A745)',
                  boxShadow: '-1px 0px 9px 0px rgba(0,0,0,0.51)',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#28A745')}
                onMouseOut={(e) =>
                  (e.currentTarget.style.background =
                    'linear-gradient(to right, #07EF3C, #28A745)')
                }
              >
                <Ticket className="mr-2" /> Buy Ticket
              </a>

              <span
                className="text-transparent text-3xl sm:text-4xl md:text-5xl font-bold hidden sm:inline"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(4,85,149,1) 0%, rgba(0,166,255,1) 50%, rgba(4,85,149,1) 100%)',
                  WebkitBackgroundClip: 'text',
                }}
              >
                |
              </span>

              <span className="text-sm sm:text-base md:text-lg">
                Action/Comedy • 2h 20m
              </span>
            </div>

            {/* RATING */}
            <div className="flex items-center mt-3 gap-2 px-3 py-1 rounded bg-transparent">
              <img
                src="src/assets/icons/icon-star.svg"
                className="size-6 sm:size-7"
              />
              <span className="text-[#EAB308] text-lg sm:text-2xl">8.5</span>
              <span className="text-lg sm:text-2xl">(425k+ ratings)</span>
            </div>
          </div>
        </div>
      </section>

      {/* SCHEDULE SECTION */}
      <section id="schedule" className="scroll-mt-24"> 
        <Schedule />
      </section>
      
      {/* PHOTOS SECTION */}
      <section className="bg-black py-10">
        <div className="px-6 sm:px-10 md:px-20 lg:px-[148px] mx-auto">
          <h5 className="flex items-center font-bold mb-4 text-2xl sm:text-3xl">
            <span
              className="text-transparent text-4xl sm:text-5xl font-bold mr-2"
              style={{
                background:
                  'linear-gradient(0deg, rgba(4,85,149,1) 0%, rgba(0,166,255,1) 50%, rgba(4,85,149,1) 100%)',
                WebkitBackgroundClip: 'text',
              }}
            >
              |
            </span>
            PHOTOS
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'src/assets/images/spidermanPhoto1.jpg',
              'src/assets/images/spidermanPhoto2.jpg',
              'src/assets/images/spidermanPhoto3.jpg',
            ].map((photo, i) => (
              <div key={i} className="w-full aspect-video overflow-hidden rounded-lg">
                <img
                  src={photo}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MORE MOVIES SECTION */}
      <section
        className="py-10"
        style={{
          background:
            'linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 166, 255, 1) 50%, rgba(0, 0, 0, 1) 100%)',
        }}
      >
        <div className="px-6 sm:px-10 md:px-20 lg:px-[148px] mx-auto">
          <h5 className="flex items-center font-bold mb-4 text-2xl sm:text-3xl">
            <span
              className="text-transparent text-4xl sm:text-5xl font-bold mr-2"
              style={{
                background:
                  'linear-gradient(0deg, rgba(4,85,149,1) 0%, rgba(0,166,255,1) 50%, rgba(4,85,149,1) 100%)',
                WebkitBackgroundClip: 'text',
              }}
            >
              |
            </span>
            MORE MOVIES
          </h5>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-20">
            {[
              'src/assets/images/MUFASACover.jpg',
              'src/assets/images/SonicCover.jpg',
              'src/assets/images/moana2Cover.jpg',
              'src/assets/images/babyJohnCover.jpg',
              'src/assets/images/werewolfCover.jpg',
            ].map((movie, i) => (
              <a key={i} href="#">
                <img
                  src={movie}
                  alt={movie}
                  className="rounded-lg shadow hover:scale-105 transition-transform duration-300 w-full"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default DetailFilm
