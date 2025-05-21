// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    // type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    trim: true,

  }
}, { timestamps: true });

const User= mongoose.model('User', userSchema);
module.exports=User;
