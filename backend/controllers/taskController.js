const pool = require("../config/db");
exports.getTasks = async (req, res) => {
  console.log(" GET /tasks");
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(" GET ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
exports.createTask = async (req, res) => {
  console.log("POST /tasks", req.body);
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const result = await pool.query(
      "INSERT INTO tasks(title) VALUES($1) RETURNING *",
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(" POST ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
exports.deleteTask = async (req, res) => {
  console.log("🗑 DELETE /tasks", req.params.id);
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};