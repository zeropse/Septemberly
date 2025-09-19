import { useEffect, useState } from "react";

const STORAGE_KEY = "todos_v1";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load todos", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to save todos", e);
    }
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks((prev) => [
      { id: uid(), text: text.trim(), done: false, createdAt: Date.now() },
      ...prev,
    ]);
    setText("");
  };

  const toggle = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  const remove = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;

  return (
    <div className="bg-white/2 border border-white/5 p-3 rounded-md mb-3">
      <h2 className="font-semibold">To-Do</h2>
      <form onSubmit={addTask} className="flex gap-2 mt-2">
        <input
          className="flex-1 p-2 rounded-md bg-transparent border border-gray-700"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add task..."
        />
        <button className="px-3 py-1 rounded-md bg-sky-500 text-sky-900">
          Add
        </button>
      </form>

      <div className="mt-2 text-sm text-gray-400">
        {completed} / {total} completed
      </div>

      <ul className="mt-2 space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id)}
            />
            <span
              className={`${t.done ? "line-through text-gray-400" : ""} flex-1`}
            >
              {t.text}
            </span>
            <button
              className="px-2 py-1 rounded-md bg-gray-700"
              onClick={() => remove(t.id)}
            >
              Delete
            </button>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="text-sm text-gray-400">No tasks yet — add one.</li>
        )}
      </ul>
    </div>
  );
}
