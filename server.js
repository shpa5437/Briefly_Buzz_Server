const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express()
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());

// Data fetching Server -- Heroku integration

app.get('/hello', (req, res) => {
  res.status(200).send("Hello World!")
})

app.get('/:params', async (req, res) => {

  const baseUrl = "https://newsapi.org/v2"
  const url = baseUrl + `/${req.params.params}` + `?${new URLSearchParams(req.query).toString()}`

  try {
    const response = await axios.get(url);
    res.send(response.data)
  } catch (error) {
    console.log(url)
    // console.error(error);
    res.status(500).send('Error occurred while fetching data');
  }

})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})