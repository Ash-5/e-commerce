const dotenv = require("dotenv");
const path = require("path");
const env = process.env.NODE_ENV || "development";
dotenv.config({
    path: path.join(__dirname, `./config/${env}.env`)
});
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require("./models");
const product = require("./routes/products");
const variant = require("./routes/variants")

models["variant"].belongsTo(models["product"], {
    foreignKey: "product_id"
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());

// Route
app.use("/products", product);
app.use('/products/:pid/variants', variant);

console.log(process.env.HOST_PORT);
if (env === "development") {
    app.listen(process.env.HOST_PORT, () => {
        console.log(`Server started at port:- ${process.env.HOST_PORT}`)
    });
}
