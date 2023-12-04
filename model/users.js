import {mongoose} from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
 
  password: {
    type: String,
    required: true,
    unique: true ,
  },
  age: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  tokenExpiresAt: {
    type: Date,

  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
  updatedAt: {
    type:Date,
    default: Date.now,
  },

});

const User = mongoose.model('users', userSchema);
export default User;
