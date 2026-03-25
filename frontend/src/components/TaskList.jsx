import API from "../services/api";

export default function TaskList({ tasks, refresh }) {
  const deleteTask = async (id) => {
    try {
      await API.delete(`/${id}`);
      refresh();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  return (
    <div className="list">
      {tasks.map((t) => (
        <div key={t.id} className="task">
          <span>{t.title}</span>
          <button onClick={() => deleteTask(t.id)}></button>
        </div>
      ))}
    </div>
  );
}