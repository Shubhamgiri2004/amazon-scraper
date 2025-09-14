import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = process.env.SCRAPER_API_KEY;
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from melody team");
});

//Get product details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await axios.get(
      `${baseUrl}&url=http://amazon.com/dp/${productId}`
    );
    res.json(response.data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

//Get product reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await axios.get(
      `${baseUrl}&url=http://amazon.com/product-reviews/${productId}`
    );
    res.json(response.data);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

// Get product offer
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await axios.get(
      `${baseUrl}$url=http://amazon.com/gp/offer-listing/${productId}`
    );
    res.json(response.data);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
