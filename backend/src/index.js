const express = require('express')
const cors = require("cors");
const ParserSVG = require("./classes/ParserSVG");

const app = express();
app.use(cors());
app.use(express.json())

const port = 5000;

app.post('/svg_parse', async (req, res) => {
  const svgAtStr = req.body?.svgAtStr;
  if (svgAtStr) {
    const tags = ParserSVG.dividedAtTags(svgAtStr);
    res.send({ status: 200, data: tags});
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`\n\n\nExample app listening on port ${port}`)
});