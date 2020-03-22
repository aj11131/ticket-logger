const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the ticket logger..." })
);

// Define Routes
app.use("/api/tickets", require("./routes/tickets"));
app.use("/api/techs", require("./routes/techs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
