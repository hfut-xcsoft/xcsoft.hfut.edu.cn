var Schema = require('mongoose').Schema;

var ObjectId = Schema.Types.ObjectId;

var ProjectSchema = new Schema({

  name:         {type: String,    default: ''},
  name_short:   {type: String,    default: ''},
  description:  {type: String,    default: ''},
  detail: {
    source:     {type: String,    default: ''},
    html:       {type: String,    default: ''}
  },
  designer:    [{type: ObjectId,  ref: 'Member'}],
  developer:   [{type: ObjectId,  ref: 'Member'}],
  technology:   {type: String,    default: ''},
  finishTime:   {type: Date,      default: Date.now},
  picture:      {type: String,    default: ''},
  status:       {type: Number,    default: 1}
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