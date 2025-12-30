import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/share/Sidebar";
import NavbarAdmin from "../components/share/NavbarAdmin";
import TableAdmin from "../components/share/TableAdmin";
import { ChevronDown, ChevronUp, CirclePlus, Search, Trash2 } from "lucide-react";
import AlertPopup from "../components/share/AlertPopup";

function AdminFilm() {
  const film = Array.from({ length: 55 }, (_, i) => ({
    id: i + 1,
    title: "Spider-Man: Across the Spider-Verse",
    description:
      "In an attempt to curb the Spot, a scientist from harnessing the power of the multiverse.",
    genres: ["Action"],
    duration: "140 mins",
    age: "SU",
    posterUrl: "/images/SpidermanCover.jpg",
    photoBg: "/images/spidermanBG.png",
    photo1: "/images/spidermanPhoto1.jpg",
    photo2: "/images/spidermanPhoto2.jpg",
    photo3: "/images/spidermanPhoto3.jpg",
    rating: 8.5,
    ratingCount: 461000,
    trailer:
      "https://www.imdb.com/video/vi207143961/?playlistId=tt9362722",
    releaseDate: "2023-05-31",
    schedule: [
      {
        cinemaId: 1,
        startTime: "17:00:00",
        studio: 1,
      },
    ],
  }));

  const [films, setFilms] = useState(film);
  const [alert, setAlert] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteClosing, setIsDeleteClosing] = useState(false);

  const [images, setImages] = useState({});
  const inputRefs = useRef({});
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [initialImages, setInitialImages] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [genre, setGenre] = useState("");
  const [age, setAge] = useState("");
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isAgeOpen, setIsAgeOpen] = useState(false);

  const [scheduleInput, setScheduleInput] = useState("");
  const [studioInput, setStudioInput] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  const IMAGE_KEY_MAP = {
    poster: "posterUrl",
    background: "photoBg",
    image1: "photo1",
    image2: "photo2",
    image3: "photo3",
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedRow) return;

    setFilms((prev) =>
      prev.filter((film) => film.id !== selectedRow.id)
    );

    setShowDeleteModal(false);
    setSelectedRow(null);

    setAlert({
      type: "success",
      message: "Data Film berhasil dihapus",
    });

    setTimeout(() => setAlert(null), 2500);
  };

  const closeDeleteModal = () => {
    setIsDeleteClosing(true);

    setTimeout(() => {
      setShowDeleteModal(false);
      setIsDeleteClosing(false);
      setSelectedRow(null);
    }, 300);
  };



  const handleEditFilm = (film) => {
    setSelectedFilm(film);
    setIsEditMode(true);
    setIsClosing(false);
    setShowModal(true);
    setSchedules(film.schedule || []);

    setGenre(film.genres?.[0] || "");
    setAge(film.age);

    const prefilledImages = {};
    const initial = {};

    IMAGE_TYPES.forEach((img) => {
      const filmKey = IMAGE_KEY_MAP[img.key];
      const imageUrl = film[filmKey];

      if (imageUrl) {
        prefilledImages[img.key] = {
          preview: imageUrl,
          isFromServer: true,
        };
        initial[img.key] = true;
      }
    });

    setImages(prefilledImages);
    setInitialImages(initial);
  };


  const handleAddSchedule = () => {
    if (!scheduleInput || !studioInput) return;

    const newSchedule = {
      id: Date.now(),
      datetime: scheduleInput,
      studio: studioInput,
    };

    setSchedules((prev) =>
      [...prev, newSchedule].sort((a, b) => {
        const dateA = new Date(a.datetime);
        const dateB = new Date(b.datetime);

        if (dateA.getTime() !== dateB.getTime()) {
          return dateA - dateB;
        }

        return a.studio.localeCompare(b.studio);
      })
    );

    setScheduleInput("");
    setStudioInput("");
  };

  const handleRemoveSchedule = (id) => {
    setSchedules((prev) => prev.filter((item) => item.id !== id));
  };

  const IMAGE_TYPES = [
    { key: "poster", label: "Poster" },
    { key: "background", label: "Background" },
    { key: "image1", label: "Image 1" },
    { key: "image2", label: "Image 2" },
    { key: "image3", label: "Image 3" },
  ];

  const resetForm = () => {
    setImages({});
    setError(null);
    setGenre("");
    setAge("");
    setSchedules([]);
    setScheduleInput("");
    setStudioInput("");


    Object.values(inputRefs.current).forEach((input) => {
      if (input) input.value = null;
    });
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

  const handleImageUpload = (type, file) => {
    if (!file) return;
    if (!validateImage(file)) return;

    setError(null);
    setImages((prev) => ({
      ...prev,
      [type]: {
        file,
        preview: URL.createObjectURL(file),
      },
    }));
  };

  const removeImage = (type) => {
    setImages((prev) => {
      const copy = { ...prev };
      delete copy[type];
      return copy;
    });

    if (inputRefs.current[type]) {
      inputRefs.current[type].value = null;
    }
  };

  const openImagePreview = (src, label) => {
    setPreviewImage({ src, label });
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  const openModal = () => {
    resetForm();
    setSelectedFilm({
      title: "",
      description: "",
      duration: "",
      age: "",
      rating: "",
      ratingCount: "",
      trailer: "",
      releaseDate: "",
      genres: [],
      schedule: [],
    });
    setIsEditMode(false);
    setShowModal(true);
    setIsAgeOpen(false);
    setIsGenreOpen(false);
    setIsStudioOpen(false);
    setInitialImages({});
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
      setIsEditMode(false);
      setSelectedFilm(null);
      setInitialImages({});
      resetForm();
    }, 300);
  };

  const handleSubmitFilm = () => {
  const missingImages = IMAGE_TYPES.filter((img) => {
    const hasImageNow = !!images[img.key];
    const hadImageBefore = !!initialImages[img.key];

    return !hasImageNow && ( !isEditMode || hadImageBefore );
  });

  if (
    !selectedFilm.title ||
    !selectedFilm.description ||
    !genre ||
    !age ||
    !selectedFilm.duration ||
    !selectedFilm.releaseDate ||
    !selectedFilm.rating ||
    !selectedFilm.ratingCount ||
    !selectedFilm.trailer ||
    schedules.length === 0 ||
    missingImages.length > 0
  ) {
    setAlert({
      type: "error",
      message:
        missingImages.length > 0
          ? "Gambar Film harus diunggah!"
          : "Semua data Film harus diisi!",
    });
    setTimeout(() => setAlert(null), 2500);
    return;
  }



    const payload = {
      ...selectedFilm,
      genres: [genre],
      age,
      schedule: schedules,
      ...Object.fromEntries(
        Object.entries(images).map(([k, v]) => [IMAGE_KEY_MAP[k], v.preview])
      ),
    };

    if (isEditMode) {
      setFilms((prev) =>
        prev.map((f) => (f.id === selectedFilm.id ? payload : f))
      );
    } else {
      setFilms((prev) => [{ ...payload, id: Date.now() }, ...prev]);
    }

    setAlert({
      type: "success",
      message: isEditMode
        ? "Data Film berhasil diperbarui"
        : "Data Film berhasil ditambahkan",
    });

    setTimeout(() => setAlert(null), 2500);
    closeModal();
  };

  // Search
  const filteredData = films.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;

    return (
      item.title.toLowerCase().includes(q) ||
      item.genres.join(", ").toLowerCase().includes(q) ||
      item.duration.toLowerCase().includes(q) ||
      item.age.toLowerCase().includes(q) ||
      item.releaseDate.includes(q) ||
      String(item.rating).includes(q)
    );
  });


  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [filteredData.length, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + pageSize
  );

  const tableData = paginatedData.map((item) => ({
    id: item.id,
    title: item.title,
    genre: item.genres.join(", "),
    duration: item.duration,
    age: item.age,
    rating: item.rating,
    releaseDate: new Date(item.releaseDate).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));


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
                <h1 className="text-4xl font-extrabold">Data Film</h1>
              </div>

              <div className="flex justify-between items-center mb-3">
                {/* CREATE DATA BUTTON */}
                <button
                  onClick={openModal}
                  className="flex items-center h-9 gap-2 bg-linear-to-r from-[#00A6FF] to-[#045595] px-4 py-2 rounded-xl shadow-lg font-semibold text-white hover:bg-none hover:bg-[#045595] active:scale-95 cursor-pointer"
                >
                  <CirclePlus /> Create Data Film
                </button>

                {/* SEARCH BAR */}
                <div className="flex items-center bg-white opacity-60 h-9 px-4 py-2 rounded-xl shadow-lg w-[322px] overflow-hidden">
                  <Search className="text-[#464C55] mr-1" />
                  <input
                  type="search"
                    placeholder="Search Film"
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
                  { label: "Title", key: "title" },
                  { label: "Genre", key: "genre" },
                  { label: "Duration", key: "duration" },
                  { label: "Age", key: "age" },
                  { label: "Rating", key: "rating" },
                  { label: "Release Date", key: "releaseDate" },
                ]}
                data={tableData}
                currentPage={currentPage}
                pageSize={pageSize}
                onEdit={(row) => {
                  const fullFilm = films.find((f) => f.id === row.id);
                  handleEditFilm(fullFilm);
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

                  <div className="pb-6">
                    <h2 className="flex items-center gap-1.5 text-2xl text-white rounded-xl shadow-md font-bold px-4 py-2 bg-linear-to-r from-[#00A6FF] to-[#045595]">
                      <CirclePlus />
                      {isEditMode ? "Edit Data Film" : "Create Data Film"}
                    </h2>

                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-6 rounded-2xl shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25)]">
                    <form className="space-y-4">

                      {/* IMAGE UPLOAD SECTION */}
                      <div>
                        <p className="text-lg font-semibold mb-2">Upload Images</p>

                        {/* Upload Buttons */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {IMAGE_TYPES.map((img) => (
                            <button
                              key={img.key}
                              type="button"
                              onClick={() => inputRefs.current[img.key].click()}
                              className="px-3 py-1.5 rounded-lg shadow-lg bg-linear-to-r from-[#00A6FF] to-[#045595] text-white hover:bg-none hover:bg-[#045595] active:scale-95 text-sm font-semibold cursor-pointer"
                            >
                              Upload {img.label}
                            </button>
                          ))}
                        </div>

                        {IMAGE_TYPES.map((img) => (
                          <input
                            key={img.key}
                            type="file"
                            accept="image/jpeg, image/png"
                            ref={(el) => (inputRefs.current[img.key] = el)}
                            className="hidden"
                            onChange={(e) => handleImageUpload(img.key, e.target.files[0])}
                          />
                        ))}

                        {/* Preview Slider */}
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400">
                          {IMAGE_TYPES.map(
                            (img) =>
                              images[img.key] && (
                                <div
                                  key={img.key}
                                  className="relative min-w-[150px] h-[200px] rounded-xl border shadow-md overflow-hidden"
                                >
                                  <img
                                    src={images[img.key].preview}
                                    alt={img.label}
                                    onClick={() =>
                                      openImagePreview(images[img.key].preview, img.label)
                                    }
                                    className="w-full h-full object-cover cursor-zoom-in hover:opacity-90 transition"
                                  />


                                  {/* Label */}
                                  <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-1">
                                    {img.label}
                                  </span>

                                  {/* Remove */}
                                  <button
                                    onClick={() => removeImage(img.key)}
                                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-1 rounded-md cursor-pointer"
                                  >
                                    <Trash2 size={14} className="text-white" />
                                  </button>
                                </div>
                              )
                          )}
                        </div>

                        {error && (
                          <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
                        )}
                      </div>

                      {previewImage && (
                      <div
                        className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-6 w-full h-full rounded-xl"
                        onClick={closeImagePreview}
                      >
                        <div
                          className="relative max-w-[90vw] max-h-[90vh]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Image */}
                          <img
                            src={previewImage.src}
                            alt={previewImage.label}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                          />

                          {/* Label */}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm text-center py-2 rounded-b-lg">
                            {previewImage.label}
                          </div>

                          {/* Close Button */}
                          <button
                            onClick={closeImagePreview}
                            className="absolute -top-3 -right-3 bg-[#FF0004] text-white font-semibold hover:bg-[#b90003] cursor-pointer shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)] rounded-full w-8 h-8 flex items-center justify-center"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}

                      {/* Form Fields */}
                      <div className="flex flex-col w-full">
                        {/* TITLE */}
                        <label className="text-lg mb-1 font-medium">Title</label>
                        <input
                          placeholder="Enter title"
                          type="text"
                          value={selectedFilm?.title || ""}
                          onChange={(e) =>
                            setSelectedFilm((prev) => ({ ...prev, title: e.target.value }))
                          }
                          className="w-full p-2.5 border border-[#00A6FF] rounded-[13px]"
                        />

                      </div>

                      <div className="flex flex-col w-full">
                        {/* DESCRIPTION */}
                        <label className="text-lg mb-1 font-medium">Description</label>
                        <textarea
                          required
                          type="text"
                          rows={3}
                          placeholder="Enter description"
                          value={selectedFilm?.description || ""}
                          onChange={(e) =>
                            setSelectedFilm((prev) => ({ ...prev, description: e.target.value }))
                          }
                          className="w-full p-2.5 border border-[#00A6FF] rounded-[13px]"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col w-full">
                          {/* GENRE */}
                          <label className="text-lg mb-1 font-medium">Genre</label>

                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsGenreOpen((p) => !p)}
                              className="w-full p-2.5 border border-[#00A6FF] rounded-[13px] bg-white flex justify-between items-center"
                            >
                              <span className={genre ? "text-black" : "text-gray-400"}>
                                {genre || "Pilih Genre"}
                              </span>
                              {isGenreOpen ? <ChevronUp /> : <ChevronDown />}
                            </button>

                            {isGenreOpen && (
                              <ul className="absolute z-10 mt-1 w-full bg-white border border-[#00A6FF] rounded-[13px] shadow-md">
                                {[
                                  "Adventure",
                                  "Action",
                                  "Comedy",
                                  "Drama",
                                  "Horror",
                                  "Animation",
                                  "Fantasy",
                                ].map((g) => (
                                  <li
                                    key={g}
                                    onClick={() => {
                                      setGenre(g);
                                      setIsGenreOpen(false);
                                    }}
                                    className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                                  >
                                    {g}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <input type="hidden" required value={genre} />
                        </div>


                      <div className="flex flex-col w-full">
                          {/* DURATION */}
                          <label className="text-lg mb-1 font-medium">Duration</label>
                          <input
                            required
                            type="text"
                            placeholder="Enter duration (Ex: 120 mins)"
                            value={selectedFilm?.duration || ""}
                            onChange={(e) =>
                              setSelectedFilm((prev) => ({ ...prev, duration: e.target.value }))
                            }
                            className="w-full p-2.5 border border-[#00A6FF] rounded-[13px]"
                          />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col w-full">
                        {/* AGE */}
                        <label className="text-lg mb-1 font-medium">Age</label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsAgeOpen((p) => !p)}
                            className="w-full p-2.5 border border-[#00A6FF] rounded-[13px] bg-white flex justify-between items-center"
                          >
                            <span className={age ? "text-black" : "text-gray-400"}>
                              {age || "Pilih Age"}
                            </span>
                            {isAgeOpen ? <ChevronUp /> : <ChevronDown />}
                          </button>

                          {isAgeOpen && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border border-[#00A6FF] rounded-[13px] shadow-md">
                              {["SU", "13+", "17+"].map((a) => (
                                <li
                                  key={a}
                                  onClick={() => {
                                    setAge(a);
                                    setIsAgeOpen(false);
                                  }}
                                  className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                                >
                                  {a}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <input type="hidden" required value={age} />
                      </div>


                      <div className="flex flex-col w-full">
                          {/* RELEASE DATE */}
                          <label className="text-lg mb-1 font-medium">Release Date</label>
                          <input
                            required
                            type="date"
                            placeholder="Enter release date"
                            value={selectedFilm?.releaseDate || ""}
                            onChange={(e) =>
                              setSelectedFilm((prev) => ({ ...prev, releaseDate: e.target.value }))
                            }
                            className="w-full p-2.5 border border-[#00A6FF] rounded-[13px]"
                          />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col w-full">
                          {/* RATING */}
                          <label className="text-lg mb-1 font-medium">Rating</label>
                        <input
                          required
                          type="number"
                          placeholder="Enter rating"
                          value={selectedFilm?.rating || ""}
                          onChange={(e) =>
                            setSelectedFilm((prev) => ({ ...prev, rating: e.target.value }))
                          }
                          className="w-full p-2.5 border border-[#00A6FF] rounded-[13px]"
                        />
                        </div>
                          
                        <div className="flex flex-col w-full">
                          {/* RATING COUNT */}
                          <label className="text-lg mb-1 font-medium">Rating Count</label>
                        <input
                          required
                          type="number"
                          placeholder="Enter rating count"
                          value={selectedFilm?.ratingCount || ""}
                          onChange={(e) =>
                            setSelectedFilm((prev) => ({ ...prev, ratingCount: e.target.value }))
                          }
                          className="w-full p-2.5 border border-[#00A6FF] rounded-[13px]"
                        />
                        </div>
                      </div>

                      <div className="flex flex-col w-full">
                        {/* TRAILER */}
                        <label className="text-lg mb-1 font-medium">Trailer</label>
                        <input
                          required
                          type="url"
                          placeholder="Enter trailer"
                          value={selectedFilm?.trailer || ""}
                          onChange={(e) =>
                            setSelectedFilm((prev) => ({ ...prev, trailer: e.target.value }))
                          }
                          className="w-full p-2.5 border border-[#00A6FF] rounded-[13px]"
                        />
                      </div>
                      
                      {/* Schedule */}
                      <label className="text-lg font-medium">Schedule</label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                        <input
                          required
                          type="datetime-local"
                          value={scheduleInput}
                          onChange={(e) => setScheduleInput(e.target.value)}
                          className="w-full p-2.5 border border-[#00A6FF] rounded-[13px]"
                        />

                        {/* Studio */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsStudioOpen((prev) => !prev)}
                            className="w-full p-2.5 border border-[#00A6FF] rounded-[13px] bg-white flex items-center justify-between"
                          >
                            <span className={studioInput ? "text-black" : "text-gray-400"}>
                              {studioInput || "Pilih Studio"}
                            </span>

                            {isStudioOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>

                          {isStudioOpen && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border border-[#00A6FF] rounded-[13px] shadow-md">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <li
                                  key={num}
                                  onClick={() => {
                                    setStudioInput(`Studio ${num}`);
                                    setIsStudioOpen(false);
                                  }}
                                  className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                                >
                                  Studio {num}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>



                      <div className="flex flex-col w-full">
                        {/* Add Button */}
                          <button
                            type="button"
                            onClick={handleAddSchedule}
                            disabled={!scheduleInput || !studioInput}
                            className={`
                              p-2.5 font-semibold rounded-[13px] transition
                              ${
                                !scheduleInput || !studioInput
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-linear-to-r from-[#00A6FF] to-[#045595] text-white hover:bg-[#045595] active:scale-95 cursor-pointer"
                              }
                            `}
                          >
                            Add Schedule
                          </button>

                      </div>

                      {schedules.length > 0 && (
                        <div className="space-y-2">
                          <p className="font-semibold text-base">Daftar Schedule</p>

                          <div className="space-y-2">
                            {schedules.map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-center border border-[#00A6FF] rounded-lg px-4 py-2"
                              >
                                <div className="text-sm">
                                  <p className="font-medium">
                                    {new Date(item.datetime).toLocaleDateString("id-ID", {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                    })}
                                  </p>
                                  <p className="text-gray-600">
                                    {new Date(item.datetime).toLocaleTimeString("id-ID", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}{" "}
                                    • {item.studio}
                                  </p>
                                </div>

                                <button
                                  onClick={() => handleRemoveSchedule(item.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md cursor-pointer"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

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
                      onClick={handleSubmitFilm}
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
          Are you sure you want to delete <b>{selectedRow?.titlegit}</b>?
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

export default AdminFilm;