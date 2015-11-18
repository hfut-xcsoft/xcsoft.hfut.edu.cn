var Schema = require('mongoose').Schema;

var ObjectId = Schema.Types.ObjectId;

var ProjectSchema = new Schema({

  name: String,
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
  finishTime: Date,
  picture: String,
  status: Number
});

ProjectSchema.statics = {

  getAllProject(callback) {
    return this
      .find({})
      .sort('finishTime')
      .exec(callback);
  }

};

module.exports = ProjectSchema;