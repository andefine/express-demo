const marked = require('marked')
const Post = require('../lib/mongo').Post

Post.plugin('contentToHtml', {
  afterFind (posts) {
    return posts.map((post) => {
      post.content = marked(post.content)
      return post
    })
  },

  afterFindOne (post) {
    if (post) {
      post.content = marked(post.content)
    }
    return post
  }
})

module.exports = {
  create: function (post) {
    return Post.create(post).exec()
  },

  getPostById: function (postId) {
    return Post
    .findOne({
      _id: postId
    })
    .populate({
      path: 'author',
      model: 'User'
    })
    .addCreateAt()
    .contentToHtml()
    .exec()
  },

  getPosts: function (author) {
    const query = {}
    if (author) {
      query.author = author
    }
    return Post
    .find(query)
    .populate({
      path: 'author',
      model: 'User'
    })
    .sort({
      _id: -1
    })
    .addCreateAt()
    .contentToHtml()
    .exec()
  },

  incPv: function (postId) {
    return Post
    .update({
      _id: postId
    }, {
      $inc: {
        pv: 1
      }
    })
    .exec()
  },

  getRawPostById: function (postId) {
    return Post
    .findOne({
      _id: postId
    })
    .populate({
      path: 'author',
      model: 'User'
    })
    .exec()
  },

  updatePostById: function (postId, data) {
    return Post
    .update({
      _id: postId
    }, {
      $set: data
    })
    .exec()
  },

  delPostById: function (postId) {
    return Post.deleteOne({
      _id: postId
    })
    .exec()
  }
}