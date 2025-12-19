import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/share/Sidebar";
import NavbarAdmin from "../components/share/NavbarAdmin";
import TableAdmin from "../components/share/TableAdmin";
import { ChevronDown, ChevronUp, CirclePlus, Search, Trash2, Eye, EyeOff } from "lucide-react";
import AlertPopup from "../components/share/AlertPopup";

function AdminPengguna() {
  const [users, setUsers] = useState(
    Array.from({ length: 55 }, (_, i) => ({
        id: i + 1,
        firstName: "User",
        lastName: `${i + 1}`,
        email: `User${i + 1}@gmail.com`,
        password: "User123",
        role: "User",
        cinemaId: -1,
        photoProfile: "/images/spidermanPhoto1.jpg",
    }))
  );

  const [alert, setAlert] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteClosing, setIsDeleteClosing] = useState(false);

  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const [hasInitialImage, setHasInitialImage] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [userRole, setUserRole] = useState("");
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedRow) return;

    setUsers((prev) =>
      prev.filter((item) => item.id !== selectedRow.id)
    );

    setShowDeleteModal(false);
    setSelectedRow(null);

    setAlert({
      type: "success",
      message: "Data Pengguna berhasil dihapus",
    });
  };

  const closeDeleteModal = () => {
    setIsDeleteClosing(true);

    setTimeout(() => {
      setShowDeleteModal(false);
      setIsDeleteClosing(false);
      setSelectedRow(null);
    }, 300);
  };


  const handleEditUser = (item) => {
    setSelectedUser(item);
    setUserRole(item.role);

    if (item.photoProfile) {
      setImage(item.photoProfile);
      setHasInitialImage(true);
    } else {
      setImage(null);
      setHasInitialImage(false);
    }

    setIsEditMode(true);
    setIsClosing(false);
    setShowModal(true);
  };

  const resetForm = () => {
    setImage(null);
    setError(null);
    setIsDragging(false);
    if (inputRef.current) inputRef.current.value = null;

    setUserRole("");
  };

  const validateImage = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSizeMB = 2;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Hanya file .jpg dan .png yang diperbolehkan.");
      return false;
    }
    if (file.size > maxSizeBytes) {
      setError(`Ukuran file maksimal ${maxSizeMB}MB.`);
      return false;
    }
    return true;
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    if (!image) setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!image) setIsDragging(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (image) return;
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      if (validateImage(file)) {
        setError(null);
        setImage(URL.createObjectURL(file));
      }
    }
  };

  const handleUpload = (e) => {
    if (image) return;
    const file = e.target.files[0];
    if (file) {
      if (validateImage(file)) {
        setError(null);
        setImage(URL.createObjectURL(file));
      }
    }
  };

  const removeImage = () => {
    setImage(null);
    setError(null);
    setIsDragging(false);
    if (inputRef.current) inputRef.current.value = null;
  };

  const openModal = () => {
    resetForm();
    setSelectedUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      cinemaId: "",
      photoProfile: null,
    });
    setIsEditMode(false);
    setShowModal(true);
    setIsRoleOpen(false);
    setShowPassword(false);
    setHasInitialImage(false);
  };



  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
      setShowPassword(false);
      setIsEditMode(false);
      setSelectedUser(null);
      setHasInitialImage(false);
      resetForm();
    }, 300);
  };

  const handleSubmitUser = () => {
    const imageIsMissing =
      (!image && !isEditMode) ||
      (isEditMode && !image && hasInitialImage);

    if (
      !selectedUser?.firstName ||
      !selectedUser?.lastName ||
      !selectedUser?.email ||
      !selectedUser?.password ||
      !userRole ||
      !selectedUser?.cinemaId ||
      imageIsMissing
    ) {
      setAlert({
        type: "error",
        message: imageIsMissing
          ? "Photo Profile harus diunggah!"
          : "Semua data Pengguna harus diisi!",
      });
      return;
    }

    if (isEditMode) {
      setUsers((prev) =>
        prev.map((item) =>
          item.id === selectedUser.id
            ? {
                ...selectedUser,
                role: userRole,
                photoProfile: image,
              }
            : item
        )
      );
    } else {
      setUsers((prev) => [
        {
          ...selectedUser,
          id: Date.now(),
          role: userRole,
          photoProfile: image,
        },
        ...prev,
      ]);
    }

    setAlert({
      type: "success",
      message: isEditMode
        ? "Data Pengguna berhasil diperbarui"
        : "Data Pengguna berhasil ditambahkan",
    });
    closeModal();
  };

  const filteredData = users.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;

    return (
      item.firstName.toLowerCase().includes(q) ||
      item.lastName.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.password.toLowerCase().includes(q) ||
      item.role.toLowerCase().includes(q) ||
      String(item.cinemaId).includes(q)
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
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    role: item.role,
    cinemaId: item.cinemaId,
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
                <h1 className="text-4xl font-extrabold">Data Pengguna</h1>
              </div>

              <div className="flex justify-between items-center mb-3">
                {/* CREATE DATA BUTTON */}
                <button
                  onClick={openModal}
                  className="flex items-center h-9 gap-2 bg-linear-to-r from-[#00A6FF] to-[#045595] px-4 py-2 rounded-xl shadow-lg font-semibold text-white hover:bg-none hover:bg-[#045595] active:scale-95 cursor-pointer"
                >
                  <CirclePlus /> Create Data Pengguna
                </button>

                {/* SEARCH BAR */}
                <div className="flex items-center bg-white opacity-60 h-9 px-4 py-2 rounded-xl shadow-lg w-[322px] overflow-hidden">
                  <Search className="text-[#464C55] mr-1" />
                  <input
                  type="search"
                    placeholder="Search Pengguna"
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
                  { label: "First Name", key: "firstName" },
                  { label: "Last Name", key: "lastName" },
                  { label: "Email", key: "email" },
                  { label: "Role", key: "role" },
                  { label: "Cinema ID", key: "cinemaId" },
                ]}
                data={tableData}
                currentPage={currentPage}
                pageSize={pageSize}
                onEdit={(row) => {
                  const fullData = users.find((item) => item.id === row.id);
                  handleEditUser(fullData);
                }}
                onDelete={handleDeleteClick}
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

            {/* POP UP */}
            {showModal && (
              <div
                className={`
                  fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 
                  transition-opacity duration-300
                  ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}
                `}
                onClick={closeModal}
              >
                <div
                  className={`
                    bg-white text-black w-[600px] max-h-[90vh] 
                    rounded-xl shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]
                    flex flex-col p-6
                    transform transition-all duration-300
                    ${isClosing ? "animate-scaleOut" : "animate-scaleIn"}
                  `}
                  onClick={(e) => e.stopPropagation()}
                >

                  {/* HEADER */}
                  <div className="pb-6">
                    <h2 className="flex items-center gap-1.5 text-2xl text-white rounded-xl shadow-md font-bold px-4 py-2 bg-linear-to-r from-[#00A6FF] to-[#045595]">
                      <CirclePlus />
                      {isEditMode ? "Edit Data Pengguna" : "Create Data Pengguna"}
                    </h2>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-6 rounded-2xl shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25)]">
                    <form className="space-y-4">

                      {/* UPLOAD IMAGE */}
                      <div className="flex gap-4 items-start">
                        <div className="relative w-40 h-40 shrink-0">
                            <div
                            className={`
                                w-full h-full border-2 rounded-full
                                flex items-center justify-center
                                shadow-md
                                ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400"}
                                ${image ? "cursor-default" : "cursor-pointer"}
                            `}
                            onClick={() => !image && inputRef.current.click()}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            >
                            {image ? (
                                <img
                                src={image}
                                alt="preview"
                                className="w-full h-full object-cover [clip-path:circle(50%)]"
                                />
                            ) : (
                                <div className="text-center text-gray-600">
                                <p className="font-medium text-sm">Drag & Drop</p>
                                <p className="text-xs">atau klik upload</p>
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/jpeg, image/png"
                                ref={inputRef}
                                className="hidden"
                                onChange={handleUpload}
                            />
                            </div>

                            {/* REMOVE BUTTON */}
                            {image && (
                            <button
                                type="button"
                                onClick={(e) => {
                                e.stopPropagation();
                                removeImage();
                                }}
                                className="
                                absolute top-2 right-2
                                bg-[#FF0004] hover:bg-[#b90003]
                                text-white p-2 rounded-md
                                shadow-lg z-10 cursor-pointer
                                "
                            >
                                <Trash2 size={16} />
                            </button>
                            )}
                        </div>

                        {/* TEXT AREA */}
                        <div className="flex flex-col max-w-[400px]">
                            <p className="text-base font-semibold text-black">
                            Masukkan Photo Profile <span className="text-red-500">*</span>
                            </p>
                            <p className="text-sm text-gray-500">
                            Accepted: .jpg, .png • Max: 2MB
                            </p>

                            {error && (
                            <p className="text-red-500 text-sm mt-2 font-medium wrap-break-word">
                                {error}
                            </p>
                            )}
                        </div>
                        </div>

                      {/* Form Fields */}
                      <div className="flex flex-col w-full">
                        {/* FIRST NAME */}
                        <label className="text-lg mb-1 font-medium">First Name</label>
                        <input
                          type="text"
                          placeholder="Enter first name"
                          value={selectedUser?.firstName || ""}
                          onChange={(e) =>
                            setSelectedUser((prev) => ({ ...prev, firstName: e.target.value }))
                          }
                          className="w-full p-2.5 border border-[#00A6FF] rounded-[13px]"
                        />
                      </div>

                      <div className="flex flex-col w-full">
                        {/* LAST NAME */}
                        <label className="text-lg mb-1 font-medium">Last Name</label>
                        <input
                          type="text"
                          placeholder="Enter last name"
                          value={selectedUser?.lastName || ""}
                          onChange={(e) =>
                            setSelectedUser((prev) => ({ ...prev, lastName: e.target.value }))
                          }
                          className="w-full p-2.5 border border-[#00A6FF] rounded-[13px]"
                        />
                      </div>

                      <div className="flex flex-col w-full">
                        {/* EMAIL */}
                        <label className="text-lg mb-1 font-medium">Email</label>
                        <input
                          type="text"
                          placeholder="Enter email"
                          value={selectedUser?.email || ""}
                          onChange={(e) =>
                            setSelectedUser((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="w-full p-2.5 border border-[#00A6FF] rounded-[13px]"
                        />
                      </div>

                      <div className="flex flex-col w-full">
                        {/* PASSWORD */}
                        <label className="text-lg mb-1 font-medium">Password</label>
                        <div className="relative">
                            <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={selectedUser?.password || ""}
                            onChange={(e) =>
                                setSelectedUser((prev) => ({ ...prev, password: e.target.value }))
                            }
                            className="w-full p-2.5 pr-12 border border-[#00A6FF] rounded-[13px]"
                            />

                            <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                            >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>


                      <div className="flex flex-col w-full">
                        {/* ROLE */}
                        <label className="text-lg mb-1 font-medium">Role</label>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsRoleOpen((prev) => !prev)}
                            className="w-full p-2.5 border border-[#00A6FF] rounded-[13px] bg-white flex items-center justify-between"
                          >
                            <span className={userRole ? "text-black" : "text-gray-400"}>
                              {userRole || "Pilih Role"}
                            </span>

                            {isRoleOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>

                          {isRoleOpen && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border border-[#00A6FF] rounded-[13px] shadow-md">
                              {[
                                "User",
                                "Admin",
                                "Super Admin",
                              ].map((role) => (
                                <li
                                  key={role}
                                  onClick={() => {
                                    setUserRole(role);
                                    setIsRoleOpen(false);
                                  }}
                                  className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                                >
                                  {role}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <input type="hidden" required value={userRole} />
                      </div>

                      <div className="flex flex-col w-full">
                        {/* CINEMA ID */}
                        <label className="text-lg mb-1 font-medium">Cinema ID</label>
                        <input
                          type="number"
                          placeholder="Enter cinema id"
                          value={selectedUser?.cinemaId || ""}
                          onChange={(e) =>
                            setSelectedUser((prev) => ({ ...prev, cinemaId: e.target.value }))
                          }
                          className="w-full p-2.5 border border-[#00A6FF] rounded-[13px]"
                        />
                      </div>
                    </form>
                  </div>

                  {/* Footer */}
                  <div className="pt-6 flex justify-end gap-3">
                    <button
                      onClick={closeModal}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF0004] text-white font-semibold hover:bg-[#b90003] active:scale-95 cursor-pointer shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]"
                    >
                      <span>
                        <img src="/icons/icon-crossFill.svg"/>
                      </span> Cancel
                    </button>

                    <button 
                      onClick={handleSubmitUser}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00FF1A] hover:bg-[#00df16] active:scale-95 cursor-pointer text-white font-semibold shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]">
                      <span>
                        <img src="/icons/icon-checkFill.svg"/>
                      </span> {isEditMode ? "Save" : "Create"}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
      {alert && (
        <AlertPopup
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {showDeleteModal && (
      <div
        className={`
          fixed inset-0 z-50 flex items-center justify-center
          bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          ${isDeleteClosing ? "animate-fadeOut" : "animate-fadeIn"}
        `}
        onClick={closeDeleteModal}
      >
        <div
          className={`
            bg-white rounded-2xl w-[450px] p-6 transform transition-all duration-300 shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]
            ${isDeleteClosing ? "animate-scaleOut" : "animate-scaleIn"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="flex items-center gap-1.5 text-2xl text-white rounded-xl shadow-md font-bold px-4 py-2 bg-linear-to-r from-[#00A6FF] to-[#045595]">
            <Trash2/> Confirm Delete
          </h2>

          <p className="my-6">
            Are you sure you want to delete <b>{selectedRow?.firstName}</b>?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={closeDeleteModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4680FF] text-white font-semibold hover:bg-[#3d70df] active:scale-95 cursor-pointer shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]"
            >
              <img src="/icons/icon-crossFill.svg"/> Cancel
            </button>

            <button
              onClick={confirmDelete}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF0004] text-white font-semibold hover:bg-[#b90003] active:scale-95 cursor-pointer shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]"
            >
              <img src="/icons/icon-checkFill.svg"/> Delete
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

export default AdminPengguna;