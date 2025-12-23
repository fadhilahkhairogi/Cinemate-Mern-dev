import React, { useState } from "react";
import Footer from '../components/share/Footer';
import Navbar2 from '../components/share/Navbar2';
import TableHistory from "../components/core/tableHistory";
import { UserPen, History, } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function HistoriPemesanan() {
  // 1️⃣ State awal users dengan dummy data
  const [users, setUsers] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      movies: `Nama Film`,
      fb: ` List Makanan`,
      date: `25-12-2024`,
      time: `${10 + (i % 12)}:00`,
      barcode: `/barcodes/barcode-${i + 1}.png`,
    }))
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 2️⃣ Fungsi stub agar JSX aman
  const handleEditUser = (item) => {
    console.log("Edit user", item);
  };
  const handleDeleteClick = (row) => {
    console.log("Delete user", row);
  };
  const openModal = () => {
    console.log("Open create modal");
  };

  // 3️⃣ Filtering & pagination
  const filteredData = users.filter(order =>
    order.movies.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.fb.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.time.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const [activeBarcode, setActiveBarcode] = useState(null);
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToPage = (page) => setCurrentPage(page);

  const visiblePages = (() => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  })();

  const tableData = paginatedData.map(item => ({
    id: item.id,
    movies: item.movies,
    fb: item.fb,
    date: item.date,
    time: item.time,
    barcode: (
      <button
        type="button"
        onClick={() => setActiveBarcode(item)}
        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
      >
        Barcode
      </button>
    )
  }));

  return (
    <div className="bg-[#00A6FF]">
      {/* Background */}
      <section
        className="relative flex min-h-screen"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.85) 13%, rgba(0,0,0,0.57) 50%, rgba(0,0,0,1) 100%)',
        }}
      >
        {/* NAVBAR */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar2 />
        </div>

        <div className='w-full mt-24 px-4 sm:px-8 lg:px-12 py-12'>
          <div className='w-full max-w-[1600px] mx-auto'>
            {/* Container */}
            <div className='mt-2 w-full max-w-[1400px] mx-auto'>
              <div className='bg-linear-to-b from-[#00A3FB] to-[#045797] rounded-[20px] p-4'>
                <form method="post">
                  <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
                    {/* Left Panel */}
                    <div className='md:col-span-4 bg-gray-100 text-black rounded-[15px] p-4 sm:p-5'>
                      {/* Kelola Profil */}
                      <div className='relative mb-4'>
                        <button
                          type='button'
                          onClick={() => navigate("/profil")}
                          className='relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]'>
                          Kelola Profil
                        </button>
                        <UserPen color="#ffffff" strokeWidth={1.5}
                          className='absolute left-3 top-1/2 -translate-y-1/2'
                        />
                      </div>
                      {/* Riwayat Pesanan */}
                      <div className='relative'>
                        <button
                          type='button'
                          className='relative flex items-center justify-center text-white p-2.5 border-none rounded-[15px] cursor-pointer w-full text-2xl sm:text-base font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595]'>
                          Lihat Riwayat Pesanan
                        </button>
                        <History color="#ffffff" strokeWidth={1.5}
                          className='absolute left-3 top-1/2 -translate-y-1/2'
                        />
                      </div>
                    </div>

                    {/* Right Panel */}
                    <div className='md:col-span-8 text-white rounded-[15px] p-4 sm:p-6 space-y-4'>
                      <div className="bg-linear-to-b from-[#00A6FF] to-[#045595] rounded-r-2xl p-5">

                        {/* TABLE */}
                        <TableHistory
                          columns={[
                            { label: "Movies", key: "movies" },
                            { label: "F&B", key: "fb" },
                            { label: "Date", key: "date" },
                            { label: "Time", key: "time" },
                            { label: "Barcode", key: "barcode" },
                          ]}
                          data={tableData}
                          currentPage={currentPage}
                          pageSize={pageSize}
                          showAction={false}
                        />

                        {/* PopUp Barcode */}
                        {activeBarcode && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="w-{420px} bg-white rounded-xl shadow-xl overflow-hidden">

                              {/* Header PopUp */}
                              <div className="flex justify-between items-center bg-blue-500 px-4 py-2">
                                <span className="text-white font-semibold">
                                  Barcode
                                </span>
                                <button
                                  onClick={() => setActiveBarcode(null)}
                                  className="text-white font-bold"
                                >
                                  X
                                </button>
                              </div>
                              {/* Content */}
                              <div className="p-5 flex justify-center">
                                {activeBarcode.barcodeImage ? (
                                  <img
                                    src={activeBarcode.barcodeImage}
                                    alt="Barcode"
                                    classname="max-w-full max-h-[300px] object-contain"
                                  />
                                ) : (
                                  <div className="w-64 h-64 bg-gray-200 flext items-center justify-center text-sm text-gray-500">
                                    Barcode tidak tersedia
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mt-6">
                          {/* PAGINATION */}
                          <div className="flex justify-between items-center mt-4">
                            <p className="text-white">
                              Showing{" "}
                              <span className="font-bold">
                                {filteredData.length === 0 ? 0 : startIndex + 1}- {Math.min(startIndex + pageSize, filteredData.length)}
                              </span>{" "}
                              of <span className="font-bold">{filteredData.length}</span>
                            </p>

                            <div className="flex bg-white text-black rounded-md border border-[#CECECE] justify-center">
                              <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 border border-[#CECECE] ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-linear-to-b from-[#00A6FF] to-[#045595] hover:text-white hover:font-semibold"}`}
                              >
                                Previous
                              </button>

                              {visiblePages.map((page) => (
                                <button
                                  key={page}
                                  type="button"
                                  onClick={() => goToPage(page)}
                                  className={`px-3 py-1 hover:bg-linear-to-b from-[#00A6FF] to-[#045595] hover:text-white hover:font-semibold border border-[#CECECE] ${currentPage === page ? "bg-linear-to-b from-[#00A6FF] to-[#045595] text-white font-semibold" : "cursor-pointer"}`}
                                >
                                  {page}
                                </button>
                              ))}

                              <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 border border-[#CECECE] ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-linear-to-b from-[#00A6FF] to-[#045595] hover:text-white hover:font-semibold"}`}
                              >
                                Next
                              </button>
                            </div>
                          </div>

                        </div>


                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default HistoriPemesanan;
