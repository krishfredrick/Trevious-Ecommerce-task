const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name:{
    type: String,
    required:[true, 'please provide the name of category']
  },
  description:{
    type:String,
  }
});

module.exports = mongoose.model('category', categorySchema );