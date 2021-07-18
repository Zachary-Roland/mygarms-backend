const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const userRoutes = require("./routes/users.routes");
const garmsRoutes = require("./routes/garms.routes");
const needsRoutes = require("./routes/needs.routes");

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/garms", garmsRoutes);
app.use("/api/needs", needsRoutes);

app.listen(port, () => console.log(`It's alive! (on port ${port})`));
