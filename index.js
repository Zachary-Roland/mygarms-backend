const express = require("express");
const app = express();
const port = process.env.PORT || 3306;
const userRoutes = require("./routes/users.routes");
const garmsRoutes = require("./routes/garms.routes");
const needsRoutes = require("./routes/needs.routes");

app.use(express.json());
app.use(express.static(__dirname + "/build"));

app.use("/api/users", userRoutes);
app.use("/api/garms", garmsRoutes);
app.use("/api/needs", needsRoutes);

app.get("*", (req, res) => {
  return res.sendFile("/build/index.html", { root: __dirname + "/" });
});

app.listen(port, () => console.log(`It's alive! (on port ${port})`));
