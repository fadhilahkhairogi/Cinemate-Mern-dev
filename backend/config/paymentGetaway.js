const midtrans = {
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
  isProduction: process.env.MIDTRANS_PRODUCTION === 'true',
}

export default { midtrans }
