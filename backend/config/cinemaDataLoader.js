import fs from 'fs'
import Cinema from '../models/cinema.js'

export default async function loadCinemaData() {
  try {
    const filePath = './data/cinemaData.json'

    if (!fs.existsSync(filePath)) {
      console.error('ERROR: cinemaData.json not found!')
      return
    }

    const jsonData = fs.readFileSync(filePath, 'utf-8')
    const cinemas = JSON.parse(jsonData)

    for (const cinema of cinemas) {
      if (!cinema.price) {
        console.error('❌ Missing price for cinema:', cinema)
        continue
      }
      const createdCinema = await Cinema.create({
        name: cinema.name,
        city: cinema.city,
        location: cinema.location,
        numOfStudio: parseInt(cinema.numOfStudio),
        priceWeekday: cinema.price.weekday,
        priceFriday: cinema.price.friday,
        priceWeekend: cinema.price.weekend,
      })
    }

    console.log('✅ Cinemas data loaded successfully!')
  } catch (err) {
    console.error('❌ Error loading cinemas data:', err)
  }
}
