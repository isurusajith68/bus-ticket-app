const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ticketRoutes = require("./routes/ticketRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const conductorRoutes = require("./routes/conductorRoutes");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/tickets", ticketRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/conductors", conductorRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
