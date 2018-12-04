const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signin')
})

router.post('/', checkNotLogin, function (req, res, next) {
  res.send('登录')
  // const name = req.fields.name
  // const password = req.fields.password

  // try {
  //   if (!name.length) {
  //     throw new Error('请填写用户名')
  //   }
  // } catch (e) {
  //   req.flash('error', e.message)
  //   return res.redirect('back')
  // }
})

module.exports = router