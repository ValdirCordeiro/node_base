require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

routes(app);

app.listen(port, () => {
    console.log("API iniciada na porta: " + port);
});

module.exports = app;

