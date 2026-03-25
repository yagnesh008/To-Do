const express = require("express");
const cors = require("cors");
const app = express();
//  Move CORS here (VERY IMPORTANT) Cross-Origin Resource Sharing.....!
app.use(cors({
  origin: "http://localhost:5173"
}));
//  Middleware
app.use(express.json());
// Test route
app.get("/test", (req, res) => {
  res.send("TEST WORKING");
});
//  Routes
app.use("/api/tasks", require("./routes/taskRoutes"));
// Health check
app.get("/", (req, res) => {
  res.send(" API is running...");
});
//  Start server
app.listen(5001, () => {
  console.log(" Server running on http://localhost:5001");
});