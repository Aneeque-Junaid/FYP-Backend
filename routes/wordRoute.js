const express = require('express')
const { getVideoForSentence} = require('../controllers/wordController')

const router = express.Router()

router.post('/get-videos', getVideoForSentence)

module.exports = router