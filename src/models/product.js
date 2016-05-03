var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: String,
  description: String,
  country: String,
  category: String,
  // images: {
  //   data: Buffer,
  //   contentType: String
  // },
  paths: [String],  
  price: Number,
  timesSold: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);