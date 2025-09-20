import { useEffect, useState } from "react";

const STORAGE_KEY = "notes";

const defaultCategories = ["personal", "study", "ideas"];

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(defaultCategories[0]);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setNotes(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load notes", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error("Failed to save notes", e);
    }
  }, [notes]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory(defaultCategories[0]);
    setEditingId(null);
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    if (editingId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingId
            ? {
                ...n,
                title: title.trim(),
                content: content.trim(),
                category,
                updatedAt: Date.now(),
              }
            : n
        )
      );
    } else {
      const newNote = {
        id: uid(),
        title: title.trim(),
        content: content.trim(),
        category,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    resetForm();
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title || "");
    setContent(note.content || "");
    setCategory(note.category || defaultCategories[0]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this note?")) return;
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const filtered = notes.filter((n) => {
    if (filter !== "all" && n.category !== filter) return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        (n.title || "").toLowerCase().includes(q) ||
        (n.content || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white/2 border border-white/5 p-4 rounded-md mb-4">
      <h2 className="text-lg font-semibold mb-2">Cozy Notes</h2>

      <form onSubmit={handleAddOrUpdate} className="space-y-2">
        <input
          className="w-full p-2 rounded-md bg-transparent border border-gray-700"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 rounded-md bg-transparent border border-gray-700"
          rows={4}
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex items-center justify-between gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded-md bg-transparent border border-gray-700"
          >
            {defaultCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            {editingId && (
              <button
                type="button"
                className="px-3 py-1 rounded-md bg-gray-700"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-3 py-1 rounded-md bg-sky-500 text-sky-900"
            >
              {editingId ? "Update" : "Add Note"}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="text-sm">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-1 rounded-md bg-transparent border border-gray-700 text-sm"
          >
            <option value="all">All</option>
            {defaultCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            placeholder="Search notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-1 rounded-md bg-transparent border border-gray-700 text-sm"
          />
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400">No notes yet — add one above.</p>
        )}
        {filtered.map((n) => (
          <article key={n.id} className="p-2 rounded-md bg-gray-800">
            <header className="flex items-center justify-between">
              <strong>{n.title || "(untitled)"}</strong>
              <div className="text-xs text-gray-400">
                {n.category} •{" "}
                {new Date(n.updatedAt || n.createdAt).toLocaleString()}
              </div>
            </header>
            <p className="whitespace-pre-wrap mt-1">{n.content}</p>
            <div className="mt-2 flex gap-2">
              <button
                className="px-2 py-1 rounded-md bg-gray-700"
                onClick={() => handleEdit(n)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 rounded-md bg-red-600 text-white"
                onClick={() => handleDelete(n.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
