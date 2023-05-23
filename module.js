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
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  account:{
    type:String,
    require:true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    require:true,
  },
  uri: {
    type: String,
    require:true,
  },
  saletype: {
    type: String,
    require:true,
  },
  timeline: {
    type: Number,
    require:true,
  },
  lastbiding:{
    type: Number,
    default:0,
  },
  bidaccount:{
    type:String,
    default:" "
  },
  sold:{
    type:Boolean,
    default:false
  },
  date:{
    type:Date
  }
 
});

const User = mongoose.model("auction", UserSchema);

module.exports = User;