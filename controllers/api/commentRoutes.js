const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const allComments = await Comment.findAll();
        res.json(allComments);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const newComment = await Comment.create({
                comment_text: req.body.commentText,
                post_id: req.body.postId,
                user_id: req.session.userId,
            });
            res.json(newComment);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;