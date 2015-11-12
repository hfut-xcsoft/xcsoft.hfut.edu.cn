var Schema = require('mongoose').Schema;

var ObjectId = Schema.Types.ObjectId;

var ProjectSchema = new Schema({

  name: String,
  description: String,
  detail: String,
  //leader: {
  //  type: ObjectId,
  //  ref: 'Member'
  //},
  //designer: [{
  //  type: ObjectId,
  //  ref: 'Member'
  //}],
  //developer: [{
  //  type: ObjectId,
  //  ref: 'Member'
  //}],
  finishTime: Date,
  pictureUrl: String,
  favorite: Number,
  status: Number
});

ProjectSchema.statics = {

  getAllProject(callback) {
    return this
      .find({})
      .sort('finishTime')
      .exec(callback);
  }

}

module.exports = ProjectSchema;