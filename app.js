const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.use('/', indexRouter)
// app.use('/users', userRouter)

app.use((req, res, next) => {
  console.log(1)
  next(new Error('dhfahf'))
})
app.use((req, res, next) => {
  console.log(2)
  res.status(200).end()
})
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('something wrong')
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})