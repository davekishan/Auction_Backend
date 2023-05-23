const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  productid:{
    type: Number,
    unique: true,
    required: true,
  },
  tokenid: {
    type: Number,
    required: true,
  }, 
  name:{
    type:String,
    require:true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require:true,
  },
  account:{
    type:String,
    require:true,
  },
  creator:{
    type:String,
    require:true
  },
  amount: {
    type: Number,
    required: true,
  },
  uri: {
    type: String,
    require:true,
  },
  date:{
    type:Date,
  },
  buy_at:{
    type:Date,
  }

});

const User = mongoose.model("myproduct", UserSchema);

module.exports = User;