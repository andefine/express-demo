const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.json({
    err_code: 0,
    message: 'ok'
  })
  // res.send('ok')
})

module.exports = router