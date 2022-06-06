const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const dbConnectionString = process.env.DB_CONNECTION_STRING.replace(
  "<password>",
  process.env.DB_PASSWORD
);

mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection success!"))
  .catch((err) => console.log(err));

const port = process.env.PORT_NUM;

app.listen(process.env.PORT || port, () => {
  console.log(`The server is listening to port : ${port}`);
});
