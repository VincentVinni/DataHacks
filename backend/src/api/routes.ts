import express from 'express'
const controller = require('../controllers/controller')
const router = express.Router()

router.route("/getImagePair").get(controller.getImagePair)
router.route("/populateAiLeaderboard").post(controller.populateDB)
router.route("/getLeaderboard").get(controller.getLeaderboard)
router.route("/updateScore").put(controller.updateScore)
router.route("/getConversation").get(controller.getConversations)
router.route("/uploadConversation").put(controller.uploadConversation)

module.exports = router; 
