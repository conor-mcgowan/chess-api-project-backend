require("dotenv").config();
const passport = require("./config/passport.conf");
const express = require("express");
const app = express();
const session = require("express-session");
const userRoutes = require("./routes/user.routes");
const opponentRoutes = require("./routes/opponent.routes");

const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(express.static(__dirname + "/build"));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SECRET_KEY }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoutes);

app.use("/opponents", opponentRoutes);

app.get("/", (req, res) => res.send("This is a server, apparently."));

app.get("*", (req, res) => res.redirect("/"));

app.get("*", (req, res) => {
  res.sendFile("/build/index.html", { root: __dirname + "/" });
});

app.listen(PORT, () => console.log(`The doors are open on port: ${PORT}`));
