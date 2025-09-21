import { useState, useMemo } from "react";
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/8bit/dialog";
import { useNotesStore } from "@/stores/notesStore";

export default function Notes() {
  const { addNote, updateNote, deleteNote } = useNotesStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteDialogId, setDeleteDialogId] = useState(null);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    if (editingId) {
      updateNote(editingId, {
        title: title.trim(),
        content: content.trim(),
      });
    } else {
      addNote({
        title: title.trim(),
        content: content.trim(),
      });
    }

    resetForm();
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title || "");
    setContent(note.content || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    deleteNote(id);
    setDeleteDialogId(null);
  };

  const notes = useNotesStore((s) => s.notes);
  const filtered = useMemo(() => {
    return [...(notes || [])].sort((a, b) => {
      const ta = new Date(a.updatedAt || a.createdAt).getTime();
      const tb = new Date(b.updatedAt || b.createdAt).getTime();
      return tb - ta;
    });
  }, [notes]);

  return (
    <div className="space-y-4">
      {/* Note Form */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Cozy Notes</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddOrUpdate} className="space-y-2">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="min-w-0 w-full break-words whitespace-normal"
            />
            <Textarea
              placeholder="Write something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="min-w-0 w-full break-words whitespace-normal"
            />
            <div className="flex items-center justify-between gap-4 mt-6">
              {editingId ? (
                <>
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="cursor-pointer w-1/2"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    className="cursor-pointer w-1/2"
                  >
                    Update
                  </Button>
                </>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  className="cursor-pointer w-full"
                >
                  Add Note
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Notes List */}
      <Card>
        <CardContent>
          <div className="space-y-2">
            {filtered.length === 0 && (
              <p className="text-sm text-gray-400 text-center">No notes yet.</p>
            )}
            {filtered.map((n) => (
              <Card key={n.id}>
                <CardHeader className="flex items-center justify-between min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <strong className="break-words whitespace-normal max-w-full">
                      {n.title || "(Untitled)"}
                    </strong>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(n.updatedAt || n.createdAt).toLocaleString()}
                    {n.updatedAt && n.createdAt && n.updatedAt > n.createdAt ? (
                      <span className="ml-2 text-[11px] text-gray-500">
                        (edited)
                      </span>
                    ) : (
                      <span className="ml-2">&nbsp;</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap break-words">{n.content}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleEdit(n)}
                    className="cursor-pointer w-1/2"
                  >
                    Edit
                  </Button>
                  <Dialog
                    open={deleteDialogId === n.id}
                    onOpenChange={(open) =>
                      open ? setDeleteDialogId(n.id) : setDeleteDialogId(null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="cursor-pointer w-1/2"
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete this note?</DialogTitle>
                      </DialogHeader>
                      <DialogFooter className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setDeleteDialogId(null)}
                          className="cursor-pointer w-1/2"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(n.id)}
                          className="cursor-pointer w-1/2"
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
        </CardContent>
      </Card>
    </div>
  );
}
