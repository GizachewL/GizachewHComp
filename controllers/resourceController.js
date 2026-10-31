const Resource = require('../models/Resource');

// @desc    Get all resources
// @route   GET /api/resources
exports.getResources = async (req, res) => {
  try {
    const { category, type } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (type) filter.type = type;

    const resources = await Resource.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: resources.length, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a resource
// @route   POST /api/resources
exports.createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json({ success: true, data: resource });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single resource
// @route   GET /api/resources/:id
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    res.status(200).json({ success: true, data: resource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    res.status(200).json({ success: true, message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
