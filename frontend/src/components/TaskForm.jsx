import { useState } from "react";
import API from "../services/api";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) return alert("Enter task");

    try {
      await API.post("/create-user", { title });
      setTitle("");
      refresh();
    } catch (err) {
      console.error(" Add error:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button>Add</button>
    </form>
  );
}