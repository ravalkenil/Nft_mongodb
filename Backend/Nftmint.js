const mongoose = require('mongoose');

const nftMintSchema = new mongoose.Schema({
  nftMint: String,
  imageUrl: String,     
  title: String,         
  creator: String,       
  price: Number,
});

module.exports = mongoose.model('NFTMint', nftMintSchema);