const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
//const cookieSession = require("cookie-session");
//const { hash, compare } = require("./bc");
const db = require("./db");
//const csurf = require("csurf");
//const crs = require("crypto-random-string");
//const ses = require("./ses");
const s3 = require("./s3");
const uidSafe = require("uid-safe");
const config = require("./config.json");
//_________________________________________

//_______________________________________________

// this is our socket.io boilerplate
const server = require("http").Server(app); //app because of first handshake handshake
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

///socket///

///upload///

const multer = require("multer");
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
///upload///

//const cookieSessionMiddleware = cookieSession({
//   secret: `eating is an intentional act`,
//  maxAge: 1000 * 60 * 60 * 24 * 14,
//});

//app.use(cookieSessionMiddleware);
//io.use(function (socket, next) {
//cookieSessionMiddleware(socket.request, socket.request.res, next);
//});

//app.use(csurf());
//app.use(function (req, res, next) {
// res.cookie("mytoken", req.csrfToken());
// next();
//});

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

//_________________________________________

//____________________________


//____________________________________________________________________

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

//____________________________________________________________________
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

//_________________________________________________

