const mongoose=require('mongoose');


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    min: 0
  },
  link: {
    type: String,
  }
}, { timestamps: true });
const Product=mongoose.model('Product',productSchema);
module.exports=Product;