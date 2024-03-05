require('dotenv').config()

const express = require("express");
const provRoutes = require("./src/routes/prov.route");
const searchRoutes = require("./src/routes/search.route");
const kabKotaRoutes = require("./src/routes/kabkota.route");
const kecRoutes = require("./src/routes/kec.routes");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => res.send("Data Daerah BE is up and running"));
app.get("/api/v1", (req, res) => res.send("Data Daerah API v1 is up and running"));
app.use("/api/v1/provinsi", provRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/kabupaten-kota", kabKotaRoutes);
app.use("/api/v1/kecamatan", kecRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
