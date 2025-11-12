import { useEffect, useState } from 'react'

export default function MessagePopup({ message, duration = 4321 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), duration)
      return () => clearTimeout(timer)
    }
  }, [message, duration])

  if (!visible || !message) return null

  return (
    <div
      className="
        fixed bottom-8 right-8 z-50
        bg-[#001826] text-white text-lg font-semibold
        border border-[#00A6FF]
        shadow-[0_0_10px_rgba(0,166,255,0.5)]
        px-6 py-3 rounded-xl
        animate-[fadeInOut_3s_ease_forwards]
        bg-linear-to-r from-[#00A6FF]/20 to-[#045595]/20
        backdrop-blur-md
      "
    >
      {message}
    </div>
  )
}
