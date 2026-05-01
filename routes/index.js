var express = require('express');
var router = express.Router();
const path = require('path');

// SERVE HTML PAGES 
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/menu.html'));
});

router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/about.html'));
});

router.get('/comments', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/comments.html'));
});

// COMMENTS SYSTEM 

// store comments 
let comments = [];

// GET comments (last 10)
router.get('/api/comments', (req, res) => {
  res.json(comments.slice(-10));
});

// POST comment
router.post('/api/comments', (req, res) => {
  const { name, text } = req.body;

  // validation 
  if (!name || !text || text.trim() === '') {
    return res.status(400).json({ error: 'Comment cannot be empty' });
  }

  if (text.length > 500) {
    return res.status(400).json({ error: 'Comment too long' });
  }

  const newComment = {
    name,
    text,
    timestamp: new Date()
  };

  comments.push(newComment);

  res.json({ success: true });
});

module.exports = router;