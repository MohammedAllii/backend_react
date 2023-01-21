const express = require('express')
const router = express.Router()
const {
  getStories,
  setStorie,
  updateStorie,
  deleteStorie,
  updatepos
} = require('../controllers/storieController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getStories).post(protect, setStorie)
router.route('/:id').delete(protect, deleteStorie).put(protect, updateStorie)
router.route('/sday/:day/:id').get(protect, updatepos)
module.exports = router