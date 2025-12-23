import React from "react";
import { Pencil, Trash2 } from "lucide-react";

function TableHistory({ columns = [], data = [], currentPage = 1, pageSize = 10, onEdit, onDelete, showAction = true }) {
  const startIndex = (currentPage - 1) * pageSize;

  return (
    <div className="bg-white text-black rounded-2xl shadow-xl overflow-hidden">

      {/* TABLE HEADER */}
      <div
        className="
          grid 
          bg-linear-to-r from-[#00A6FF] to-[#045595] 
          text-white font-semibold 
          py-4 px-5 text-xl h-20 
          items-center
          shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]
        "
        style={{
          gridTemplateColumns: `80px ${columns.map(() => "1fr").join(" ")} ${showAction ? "140px" : ""}`
        }}
      >
        <div
          className={`flex justify-center items-center ${
            columns.length > 0 ? "border-r-2 border-white" : ""
          }`}
        >
          No.
        </div>


        {columns.map((col, idx) => {
          const isLastColumn =
            idx === columns.length - 1 && !showAction;

          return (
            <div
              key={idx}
              className={`flex justify-center items-center ${
                !isLastColumn ? "border-r-2 border-white" : ""
              }`}
            >
              {col.label}
            </div>
          );
        })}


        {showAction && (
          <div className="flex justify-center items-center">Action</div>
        )}

      </div>

      {/* TABLE BODY */}
      <div className="px-5 py-1.5 shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]">

        {data.length === 0 && (
          <div className="text-center py-5 text-gray-500">No data available.</div>
        )}

        {data.map((item, i) => (
          <div
            key={i}
            className="grid py-4 border-b border-[#00A6FF] text-sm"
            style={{
              gridTemplateColumns: `80px ${columns.map(() => "1fr").join(" ")} ${showAction ? "140px" : ""}`
            }}
          >
            {/* NOMOR */}
            <div className="flex justify-center items-center">
              {startIndex + i + 1}.
            </div>

            {/* COLUMNS */}
            {columns.map((col, idx) => {
              const isLastColumn =
                idx === columns.length - 1 && !showAction;

              return (
                <div
                  key={idx}
                  className="flex justify-center items-center"
                >
                  {col.render ? col.render(item) : item[col.key]}
                </div>
              );
            })}


            {/* ACTION */}
            {showAction && (
            <div className="flex justify-center items-center gap-2">
              <div className="flex justify-center items-center gap-2">

              {/* EDIT BUTTON */}
              <button
                type="button"
                onClick={() => onEdit?.(item)}
                className="border-2 border-[#00FF1A] text-[#00FF1A] hover:bg-[#00FF1A] hover:text-white px-3 py-1 rounded-lg text-xs active:scale-95 font-semibold shadow-md cursor-pointer"
              >
                <Pencil />
              </button>


              {/* DELETE BUTTON */}
              <button 
                type="button"
                onClick={() => onDelete?.(item)}
                className="border-2 border-[#FF0004] text-[#FF0004] hover:bg-[#FF0004] hover:text-white px-3 py-1 rounded-lg text-xs active:scale-95 font-semibold shadow-md cursor-pointer">
                <Trash2 />
              </button>

            </div>
          </div>
          )}
          </div>
        ))}

      </div>
    </div>
  );
}

export default TableHistory;
