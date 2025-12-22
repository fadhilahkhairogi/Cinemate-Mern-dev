import { Info, Search } from 'lucide-react'
import { useState } from 'react'
import Footer from '../components/share/Footer'
import Navbar2 from '../components/share/Navbar2'

function Help() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('http://localhost:3000/api/assistant/helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      let parsed = null
      let rawText = ''
      try {
        rawText = await res.text()
        parsed = rawText ? JSON.parse(rawText) : null
      } catch (parseErr) {
        // tetap null
      }

      if (!res.ok) {
        // respon
        //  utk  error
        const errMsg =
          (parsed && (parsed.error?.message || parsed.message || JSON.stringify(parsed))) ||
          rawText ||
          `${res.status} ${res.statusText}`
        setResult('Error: ' + errMsg)
      } else {
        // berhasil
        const data = parsed
        if (data && data.error) {
          const errMsg = data.error?.message || JSON.stringify(data.error)
          setResult('Error: ' + errMsg)
        } else if (data && (data.result || data.output_text || data.result === '')) {
          setResult(data.result ?? data.output_text ?? JSON.stringify(data))
        } else if (rawText) {
          setResult(rawText)
        } else {
          setResult('OK: response kosong')
        }
      }
    } catch (err) {
      setResult('Fetch error: ' + (err.message || String(err)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#00A6FF]">
      <section
        className="relative flex min-h-screen justify-center items-center"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 13%, rgba(0,0,0,0.57) 50%, rgba(0,0,0,1) 100%)",
        }}
      >
        {/* NAVBAR */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar2 />
        </div>

        <div className="p-8 bg-white rounded-2xl shadow-[inset_0px_4px_27px_1.8px_rgba(0,0,0,0.25),0px_4px_13.5px_1.8px_rgba(0,0,0,0.25)]">
          <h1 className="flex items-center mb-6 justify-center gap-1.5 text-2xl text-white rounded-xl shadow-[0_0_9px_rgba(0,0,0,0.51)] font-bold px-4 py-2 bg-linear-to-r from-[#00A6FF] to-[#045595]">
            <Info className="size-7"/>
            Cinemate Help
          </h1>
          <form onSubmit={handleSubmit}>
            <textarea
              rows={6}
              cols={60}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Tulis prompt..."
              className="border-2 rounded-xl border-[#00A6FF] bg-black/10 text-black shadow-[0_0_9px_rgba(0,0,0,0.51)]"
            />
            <br />
            <div className="flex justify-end">
              <button 
              type="submit" 
              disabled={loading || !prompt} 
              className="relative flex items-center w-fit justify-end text-white px-4 py-2 border-none rounded-[15px] cursor-pointer mt-4 gap-1 text-2xl font-semibold bg-linear-to-r from-[#00A6FF] to-[#045595] shadow-[0_0_9px_rgba(0,0,0,0.51)] hover:bg-none hover:bg-[#045595] hover:scale-105 active:scale-100">
                <Search />
                {loading ? 'Minta...' : 'Kirim'}
              </button>
            </div>
          </form>

          {(loading || result) && (
            <>
              <h1 className="mt-5 font-bold text-xl mb-2">Hasil</h1>
              <pre className="min-h-48 border-2 rounded-xl border-[#00A6FF] bg-black/10 text-black shadow-[0_0_9px_rgba(0,0,0,0.51)]">
                {loading ? 'Memproses...' : result}
              </pre>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
    
  )
}

export default Help
