const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

const NFTMint = require("./model/Nftmint"); // Import the NFTMint model.

// Connect to MongoDB
mongoose.connect("mongodb+srv://ravalkenil:aGYYBXvFJZ4TFTHt@cluster.gyuua1i.mongodb.net/Nfttest?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.post("/connectwallet", (req, res) => {
  const { nftMint } = req.body;

  const nftMintsave = new NFTMint({ nftMint });
  nftMintsave.save();

  return res.json({ message: "Wallet connected successfully" });
});

app.post("/mint-nft", async (req, res) => {
  console.log(req);
  const { nftMint, imageUrl, title, creator, price } = req.body;
  
  console.log(req.body);
  // const filename = req.file.filename;

  const nftMintsave = new NFTMint({
    nftMint,
    imageUrl,
    title,
    creator,
    price,
  });
  nftMintsave.save();
  return res.json({ message: "NFT minted successfully" });
});

// Example data retrieval route
app.get("/nft-data", async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({ error: "Address parameter is required" });
    }
    const mintData = await NFTMint.find({ nftMint: address });
    return res.json(mintData);
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving NFT data" });
  }
});

app.get("/nftalldata", async (req, res) => {
  try {
    const mintData = await NFTMint.find();
    return res.json(mintData);
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving NFT data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// aGYYBXvFJZ4TFTHt