const express = require('express');
const router = express.Router();
const {
  getResources,
  createResource,
  getResourceById,
  deleteResource
} = require('../controllers/resourceController');

router.route('/').get(getResources).post(createResource);
router.route('/:id').get(getResourceById).delete(deleteResource);

module.exports = router;
