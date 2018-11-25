const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log(req)
  res.send('hello express')
})

app.listen(port, () => console.log(`Express app listening on port ${port}`))