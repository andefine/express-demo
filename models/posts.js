const Post = require('../lib/mongo').Post

// Post.plugin('contentToHtml', {
//   afterFind (posts) {
    
//   }
// })

module.exports = {
  create: function (post) {
    return Post.create(post).exec()
  }
}