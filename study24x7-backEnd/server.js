const express = require("express");
const app = express();
const port = process.env.PORT | 5000;
const consola = require("console-success");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
require("./config/db");
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//     );
//     next();
//   });

app.get("/", (req, res) => {
  res.send("Server running on port : 5000");
});

const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
app.use("/auth", authRoute);
app.use("/post", postRoute);

app.listen(port, () => {
  console.success(`Server running on http://127.0.0.1:${port}`);
});
