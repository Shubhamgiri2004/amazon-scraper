import express from "express";
import axios from "axios";
import request  from "request";

const app = express();
const PORT = process.env.port || 5000;

const apiKey = '83bff2bbdd8b6f3ac0225ddd34afabb7';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

//Get product details
app.get('/products/:productId', async(req, res)=>{
    const {productId} = req.params;

  try {
    const response = await axios.get(
      `${baseUrl}&url=http://amazon.com/dp/${productId}`
    );
    res.json(response.data);
  } catch (error) {
    res.json({ error: error.message });
  }
});



app.get("/", (req, res)=>{
    res.send("hello from melody team");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`);
});

