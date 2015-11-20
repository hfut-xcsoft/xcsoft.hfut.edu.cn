var Schema = require('mongoose').Schema;

var ObjectId = Schema.Types.ObjectId;

var ProjectSchema = new Schema({

  name: String,
  name_short: String,
  description: String,
  detail: {
    source: String,
    html: String
  },
  designer: [{
    type: ObjectId,
    ref: 'Member'
  }],
  developer: [{
    type: ObjectId,
    ref: 'Member'
  }],
  technology: String,
  finishTime: {
    type: Date,
    default: Date.now
  },
  picture: String,
  status: Number
});

ProjectSchema.statics = {

  getProjectByName(name, callback) {
    return this
      .findOne({name_short: name})
      .populate('designer')
      .populate('developer')
      .exec(callback)
  },

  getAllProjects(callback) {
    return this
      .find({})
      .sort({finishTime: -1})
      .exec(callback);
  },

  getProjectByUser(id, callback) {
    return this
      .find({$or: [{developer: id}, {designer: id}]})
      .sort({finishTime: -1})
      .exec(callback)
  }
};

module.exports = ProjectSchema;