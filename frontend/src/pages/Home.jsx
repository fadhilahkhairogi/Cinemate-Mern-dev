import React from "react";
import HomeCarousel from "../components/core/HomeCarousel";
import Footer from "../components/share/Footer";
import MovieCard from "../components/share/MovieCard";

function Home() {
  return (
    <div className="bg-black">
      {/* CAROUSEL SECTION */}
      <section>
        <HomeCarousel />
      </section>
      
      {/* NOW SHOWING IN CINEMAS SECTION */}
      <section className="mt-6">
        <MovieCard title="NOW SHOWING IN CINEMAS"/>
      </section>

      {/* UPCOMING SECTION */}
      <section>
        <MovieCard title="UPCOMING"/>
      </section>

      {/* MOVIE YOU MIGHT LIKE SECTION */}
      <section
        className="py-10"
        style={{
          background:
            'linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 166, 255, 1) 50%, rgba(0, 0, 0, 1) 100%)',
        }}
      >
        <MovieCard title="MOVIE YOU MIGHT LIKE"/>
      </section>

      {/* Footer */}
      <section>
        <Footer />
      </section>
    </div>
  );
}

export default Home;
