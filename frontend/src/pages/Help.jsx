import { useState } from 'react'

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
    <div style={{ padding: 20 }}>
      <h1>Cinemate</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={6}
          cols={60}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Tulis prompt..."
        />
        <br />
        <button type="submit" disabled={loading || !prompt}>
          {loading ? 'Minta...' : 'Kirim'}
        </button>
      </form>

      <h3>Hasil</h3>
      <pre>{result}</pre>
    </div>
  )
}

export default Help
