import express from 'express'
const controller = require('../controllers/controller')
const router = express.Router()

router.route("/getImagePair").get(controller.getImagePair)
// router.route("/populateAiLeaderboard")

module.exports = router; 
