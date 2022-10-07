const express = require("express");
const connect = require("./db");
var cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
connect();

const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
