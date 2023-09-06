// const { string } = require('joi');
const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({

  name:{
    type:String,
    required:[true, 'please provide your name'],
    minLength: 3,
    maxLength: 50,
  },
  email:{
    type: String,
    required: [true, 'Please provide email'],
    validate:{
      validator: validator.isEmail,
      message: 'Please provide valid email'
    },
  },
  password:{
    type: String,
    required: [true, 'Please provide enough password']
  },
  role:{
    type:String,
    enum: ['admin', 'user', 'owner'],
    default: 'user',
  },
});

userSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(9);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function(currPassword){
  const isMatch = await bcrypt.compare(currPassword, this.password);
  return isMatch;

}
const user = mongoose.model('User', userSchema);
module.exports = user;