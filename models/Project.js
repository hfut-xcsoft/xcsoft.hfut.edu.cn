var  mongoose = require('mongoose');
var ProjectSchema =require('../schemas/ProjectSchema');

module.exports = mongoose.model('Project', ProjectSchema);