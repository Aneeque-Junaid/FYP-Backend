const express = require('express')
const { getImagesForSentence, addWord } = require('../controllers/wordController')

const router = express.Router()

router.post('/add', addWord)
router.post('/get-images', getImagesForSentence)

module.exports = router