// controllers/movieController.js
import { OpenAI } from 'openai'
import fs from 'fs/promises'
import path from 'path'

let openai

try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
} catch (err) {}

let cachedFileList = null
const DOCS_DIR = './data/assistantData'

// GET
export async function getResponse(req, res) {
  const { prompt } = req.body
  const question = prompt

  try {
    let result = ''
    if (!process.env.OPENAI_API_KEY) result = 'Mohon maaf! chatbot sedang tidak tersedia...'
    else {
      result = await helperChatbot(question)
    }

    res.json(result)
  } catch (error) {
    res.status(500).json({
      error: "Couldn't process your question",
    })
  }
}

async function selectRelevantFile(question) {
  if (cachedFileList === null) {
    try {
      const files = await fs.readdir(DOCS_DIR)
      cachedFileList = files
        .filter(f => f.endsWith('.md') || f.endsWith('.txt'))
        .map(f => ({ filename: f }))
      console.log('Cached file list:', cachedFileList, '\n')
    } catch (err) {
      console.error('Belum bisa baca folder:', err)
      cachedFileList = []
    }
  }

  const fileList = cachedFileList
  console.log('file yang ada (di cache): ', fileList, '\n')

  const response = await openai.chat.completions.create({
    model: 'gpt-5-mini',
    // model: "gpt-5.2",
    messages: [
      {
        role: 'system',
        content:
          "Anda adalah asisten yang membantu dan memilih berkas informasi tentang web pesan tiket bioskop yang paling relevan berdasarkan pertanyaan pengguna. Berikan respons dalam format JSON dengan kolom 'filename' dan 'reason' menggunakan bahasa indonesia.",
      },
      {
        role: 'user',
        content: `
                    File tersedia (nama file adalah deskripsi file tersebut): ${JSON.stringify(
                      fileList
                    )}
                    
                    pertanyaan user : [${question}]
                    
                    Pilih file yang paling cocok dan spesifik dari pertanyaan pengguna terkait cinemate dan jelaskan alasannya. Berikan tanggapan dalam format JSON.
                `,
      },
    ],

    response_format: { type: 'json_object' },
  })

  const parsed = JSON.parse(response.choices[0].message.content)

  if (!parsed || !parsed.filename) {
    throw new Error('filename yang dipilih gak valid')
  }
  const safeName = path.basename(parsed.filename)
  const exists = fileList.some(f => f.filename === safeName)
  if (!exists) {
    if (fileList.length > 0) {
      console.warn(
        `File yang dipilih "${parsed.filename}" tidak ada di cache. Kembali ke ${fileList[0].filename}`
      )
      return {
        filename: fileList[0].filename,
        reason: 'fallback: default file',
      }
    } else {
      throw new Error('Tidak ada file dokumentasi tersedia')
    }
  }

  return { filename: safeName, reason: parsed.reason || '' }
}

export function resetFileCache() {
  cachedFileList = null
}

async function helperChatbot(question) {
  try {
    const fileSelection = await selectRelevantFile(question)
    console.log(`Selected ${fileSelection.filename} karena: ${fileSelection.reason}`)
    console.log('\n Pertanyaan pengguna adalah', question)

    const safePath = path.join(DOCS_DIR, path.basename(fileSelection.filename))
    const docContent = await fs.readFile(safePath, 'utf-8')

    const response = await openai.chat.completions.create({
      model: 'gpt-5-mini',
      // model: "gpt-5.2",
      messages: [
        {
          role: 'system',
          content:
            'Anda adalah asisten yang membantu dan menjawab pertanyaan tentang web pesan tiket bioskop berdasarkan informasi yang diberikan (dalam mode chatbot) menggunakan bahasa indonesia (gunakan bahasa lain jika pertanyaan pengguna menggunakan bahasa tersebut), tapi jangan pernah sebut cara kerja chatbot dan informasi yang ada jika tidak relevan',
        },
        {
          role: 'user',
          content: `
                      PERTANYAAN PENGGUNA (Gunakan sebagai prompt utama): [${question}]

                        informasi dari [${fileSelection.filename}:
                        ${docContent}]


                        Silakan jawab pertanyaan pengguna dengan singkat, padat, dan berdasarkan subbagian yang relevan dari informasi ini. JIKA DAN HANYA JIKA JAWABANNYA TIDAK ADA DALAM informasi sampaikan chatbot tidak punya jawaban untuk pertanyaan tersebut sampaikan dengan sopan dan sesingkat mungkin.
                    `,
        },
      ],
      verbosity: 'low',
    })

    return {
      fileSelection,
      result: response.choices[0].message.content,
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
