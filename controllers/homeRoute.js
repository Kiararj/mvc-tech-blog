const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'postTitle',
      'postText',
      'postDate',
    ],
  include: [
    {
      model: Comment,
      attributes: ['id', 'commentText', 'commentDate', 'userId', 'postId'],
      include: {
        model: User,
        attributes: ['username']
      }
    },
    {
      model: User,
      attributes: ['username']
    }
  ]
}).then(posts => {
  const postData = posts.map(post => post.get({ plain: true }));
  res.render('homepage', { posts: postData });
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

module.exports = router;