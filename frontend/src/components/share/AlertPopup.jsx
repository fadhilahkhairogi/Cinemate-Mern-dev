import { useEffect, useState } from "react";
import { CheckCircle, X, XCircle } from "lucide-react";

function AlertPopup({ type = "success", message, onClose, duration = 2500 }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-999
        ${isClosing ? "animate-slideOut" : "animate-slideIn"}
      `}
    >
      <div
        className={`flex items-center gap-1.5 px-5 py-4 rounded-xl shadow-lg text-white
          ${
            type === "success"
              ? "bg-linear-to-r from-[#00FF1A] to-[#00df16]"
              : "bg-linear-to-r from-[#FF0004] to-[#b90003]"
          }
        `}
      >
        {type === "success" ? (
          <CheckCircle size={22} />
        ) : (
          <XCircle size={22} />
        )}

        <span className="font-semibold">{message}</span>

        <button
          onClick={() => {
            setIsClosing(true);
            setTimeout(onClose, 300);
          }}
          className="text-white/80 hover:text-white"
        >
          <X size={22} />
        </button>
      </div>
    </div>
  );
}

export default AlertPopup;
