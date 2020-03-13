var express = require("express");
var app = express();
var compression = require('compression')
app.use(compression())
const path = require("path");
const bodyParser = require("body-parser");
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/card-project", { useNewUrlParser: true });
app.use(express.static(__dirname) );
app.use("/api", bodyParser.json({limit: '10mb', extended: true}));
app.use("/api", bodyParser.urlencoded({limit: '10mb', extended: true}))
let router = express.Router();
app.use("/api", router);
require("../server-controllers/user-controller")(router)
require("../server-controllers/upload-controller")(router)
require("../server-controllers/card-controller")(router)
require("../server-controllers/build-team-controller")(router)
require("../server-controllers/vote-controller")(router)
require("../server-controllers/game-controller")(router)
require("../server-controllers/home-controller")(router)
app.get("*",(req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});
var server = app.listen(process.env.PORT || 5001, function () {
    var port = server.address().port;

    console.log('Listening at http://localhost:%s', port);
});