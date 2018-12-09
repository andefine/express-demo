const express = require('express')
const router = express.Router()
const PostModel = require('../models/posts')

const checkLogin = require('../middlewares/check').checkLogin

router.get('/', function (req, res, next) {
  const author = req.query.author

  PostModel.getPosts(author)
  .then(function (posts) {
    res.render('posts', {
      posts
    })
  })
  .catch(next)
})

router.post('/create', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content

  try {
    if (!title.length) {
      throw new Error('请填写标题')
    }
    if (!content.length) {
      throw new Error('请填写内容')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }
  
  let post = {
    author,
    title,
    content
  }

  PostModel.create(post)
  .then(result => {
    post = result.ops[0]
    req.flash('success', '发表成功')
    res.redirect(`/posts/${post._id}`)
  })
  .catch(next)
})

router.get('/create', checkLogin, function (req, res, next) {
  res.render('create')
})

router.get('/:postId', function (req, res, next) {
  const postId = req.params.postId

  Promise.all([
    PostModel.getPostById(postId),
    PostModel.incPv(postId)
  ])
  .then(function (result) {
    const post = result[0]
    if (!post) {
      throw new Error('该文章不存在')
    }

    res.render('post', {
      post
    })
  })
  .catch(next)
})

router.get('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('更新文章页')
})

router.post('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('更新文章')
})

router.get('/:postId/remove', checkLogin, function (req, res, next) {
  res.send('删除文章')
})

module.exports = router