const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wishlist',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contributionDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Contribution=mongoose.model('Contribution',contributionSchema);

module.exports=Contribution;

