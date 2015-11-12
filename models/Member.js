import mongoose from 'mongoose';
import MemberSchema from '../schemas/MemberSchema';

module.exports = mongoose.model('Member', MemberSchema);