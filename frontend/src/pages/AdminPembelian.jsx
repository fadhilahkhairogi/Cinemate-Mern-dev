import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/share/Sidebar";
import NavbarAdmin from "../components/share/NavbarAdmin";
import TableAdmin from "../components/share/TableAdmin";
import { Search } from "lucide-react";

function AdminPembelian() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  // DATA DUMMY
  const [pembelian] = useState(
    Array.from({ length: 55 }, (_, i) => ({
      id: 100000+(i + 1),
      email: `User${i + 1}@gmail.com`,
      jumlah: `${i + 1}`,
      total: `${(i + 1)*1000}`,
    }))
  );

  const formatRupiah = (value) => {
    if (value === null || value === undefined) return "-";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const filteredData = pembelian.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;

    return (
      String(item.id).includes(q) ||
      item.email.toLowerCase().includes(q) ||
      String(item.jumlah).includes(q) ||
      String(item.total).includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(Math.max(1, totalPages));
  }, [filteredData.length, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const visiblePages = getVisiblePages();

  const tableData = paginatedData.map((item) => ({
    id: item.id,
    email: item.email,
    jumlah: item.jumlah,
    total: item.total,
  }));


  return (
    <div className="bg-[#00A6FF]">
      <div
        className="min-h-screen w-full text-white"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 10%, rgba(0,0,0,0.57) 55%, rgba(0,0,0,1) 100%)",
        }}
      >
        <NavbarAdmin />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 pr-5 py-8">
            <div className="bg-linear-to-b from-[#00A6FF] to-[#045595] rounded-r-2xl p-5 shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]">
              {/* HEADER */}
              <div className="flex justify-start items-center mb-6">
                <h1 className="text-4xl font-extrabold">Data Pembelian</h1>
              </div>

              <div className="flex justify-end items-center mb-3">
                {/* SEARCH BAR */}
                <div className="flex items-center bg-white opacity-60 h-9 px-4 py-2 rounded-xl shadow-lg w-[322px] overflow-hidden">
                  <Search className="text-[#464C55] mr-1" />
                  <input
                  type="search"
                    placeholder="Search Pembelian"
                    className="bg-transparent text-black w-full text-[17px] placeholder-[#464C55] px-1 py-1 outline-none border-none"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {/* TABLE */}
              <TableAdmin
                columns={[
                  { label: "ID", key: "id" },
                  { label: "Email", key: "email" },
                  { label: "Jumlah", key: "jumlah" },
                  {
                    label: "Total",
                    key: "total",
                    render: (item) => formatRupiah(item.total),
                  },
                ]}
                data={tableData}
                showAction={false}
              />

              {/* PAGINATION */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-white">
                  Showing{" "}
                  <span className="font-bold">
                    {filteredData.length === 0 ? 0 : startIndex + 1}-
                    {Math.min(startIndex + pageSize, filteredData.length)}
                  </span>{" "}
                  of <span className="font-bold">{filteredData.length}</span>
                </p>

                <div className="flex bg-white text-black rounded-md border border-[#CECECE] justify-center">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border border-[#CECECE] ${
                      currentPage === 1
                        ? "opacity-40 cursor-not-allowed"
                        : "cursor-pointer hover:bg-linear-to-b from-[#00A6FF] to-[#045595] hover:text-white hover:font-semibold"
                    }`}
                  >
                    Previous
                  </button>

                  {visiblePages.map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-1 hover:bg-linear-to-b from-[#00A6FF] to-[#045595] hover:text-white hover:font-semibold border border-[#CECECE] ${
                        currentPage === page
                          ? "bg-linear-to-b from-[#00A6FF] to-[#045595] text-white font-semibold"
                          : "cursor-pointer"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 border border-[#CECECE] ${
                      currentPage === totalPages
                        ? "opacity-40 cursor-not-allowed"
                        : "cursor-pointer hover:bg-linear-to-b from-[#00A6FF] to-[#045595] hover:text-white hover:font-semibold"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminPembelian;