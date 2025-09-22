import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/8bit/dialog";

export default function NotesList({
  notes = [],
  handleEdit,
  deleteDialogId,
  setDeleteDialogId,
  handleDelete,
  onOpenCreate,
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <CardTitle>Your Notes</CardTitle>
          <div>
            <Button
              size="sm"
              className="cursor-pointer"
              onClick={() => onOpenCreate && onOpenCreate()}
            >
              New Note
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {notes.length === 0 && (
            <p className="text-sm text-gray-400 text-center">No notes yet.</p>
          )}
          {notes.map((n) => (
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
                      <DialogDescription>
                        Are you sure? This action cannot be undone.
                      </DialogDescription>
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
  );
}
