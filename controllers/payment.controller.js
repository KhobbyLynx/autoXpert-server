import https from 'https'

export const pay = async (req, res) => {
  const params = JSON.stringify({
    email: req.body.email,
    amount: req.body.amount,
  })

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  }

  const reqpaystack = https
    .request(options, (respaystack) => {
      let data = ''

      respaystack.on('data', (chunk) => {
        data += chunk
      })

      respaystack.on('end', () => {
        res.send(data)
        console.log(JSON.parse(data))
      })
    })
    .on('error', (error) => {
      console.error(error)
    })

  reqpaystack.write(params)
  reqpaystack.end()
}
