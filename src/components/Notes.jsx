import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/8bit/card";
import { Input } from "@/components/ui/8bit/input";
import { Textarea } from "@/components/ui/8bit/textarea";
import { Button } from "@/components/ui/8bit/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/8bit/select";
import { Badge } from "@/components/ui/8bit/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/8bit/dialog";

const STORAGE_KEY = "notes";
const defaultCategories = ["personal", "study", "ideas"];

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to load notes", e);
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(defaultCategories[0]);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [deleteDialogId, setDeleteDialogId] = useState(null);

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
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setDeleteDialogId(null);
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
    <div className="space-y-4">
      {/* Note Form */}
      <Card className="p-4">
        <CardHeader>
          <h2 className="text-lg font-semibold">Cozy Notes</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddOrUpdate} className="space-y-2">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Write something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
            <div className="flex items-center justify-between gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {defaultCategories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                {editingId && (
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="default"
                  className="cursor-pointer"
                >
                  {editingId ? "Update" : "Add Note"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Filter & Search */}
      <div className="flex items-center justify-between gap-2">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {defaultCategories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Notes List */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center">No notes yet.</p>
        )}
        {filtered.map((n) => (
          <Card key={n.id}>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <strong>{n.title || "(untitled)"}</strong>
                <Badge variant="secondary">{n.category}</Badge>
              </div>
              <div className="text-xs text-gray-400">
                {new Date(n.updatedAt || n.createdAt).toLocaleString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{n.content}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleEdit(n)}
                className="cursor-pointer"
              >
                Edit
              </Button>
              <Dialog
                open={deleteDialogId === n.id}
                onOpenChange={setDeleteDialogId}
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete this note?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setDeleteDialogId(null)}
                      className="cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(n.id)}
                      className="cursor-pointer"
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
