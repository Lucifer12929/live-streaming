const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpoad = require("express-fileupload");
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpoad({ useTempFiles: true }));

//Routes
app.use("/user", require("./routes/userRoutes"));


app.use((err, req, res, next) => {
  // because err.status is undefined
  res.status(404).json({
    error: {
      message: err.message,
    },
  });
});
__dirname = path.resolve();
console.log(__dirname);

  app.get("/", (req, res) => {
    res.send("API is Runn....");
  });


const PORT = process.env.PORT || 4000;

const CONNECTION_URL =
  "mongodb+srv://prateekshaw:85bp6cjubfHVBf4u@cluster0.wwxyhq7.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server MongoDb Connected Running on Port: http://localhost:${PORT}`
      )
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);