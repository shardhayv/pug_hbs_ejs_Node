const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

const app = express();
// app.engine(
//   "hbs",
//   expressHbs.engine({
//     extname: "hbs",
//     defaultLayout: "main-layout",
//     layoutsDir: "views/layout/",
//   })
// );
app.set("view engine", "ejs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .render("404", { pageTitle: "404 PageNotFound", path: req.originalUrl });
});

app.listen(3000);
