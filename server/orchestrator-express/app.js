const express = require("express")
const app = express();
const PORT = 4000;
const routes = require("./routes")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.listen(PORT, () => {
  console.log("running at", PORT)
});