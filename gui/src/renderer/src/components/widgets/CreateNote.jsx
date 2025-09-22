import { Input } from '@/components/ui/8bit/input'
import { Textarea } from '@/components/ui/8bit/textarea'
import { Button } from '@/components/ui/8bit/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'

export default function CreateNote({
  open,
  onOpenChange,
  title,
  setTitle,
  content,
  setContent,
  editingId,
  resetForm,
  handleAddOrUpdate,
  onClose
}) {
  const handleSubmit = (e) => {
    const res = handleAddOrUpdate(e)
    if (res && typeof onClose === 'function') onClose()
    return res
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingId ? 'Edit Note' : 'New Note'}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {editingId ? 'Edit your note.' : 'Create a new note.'}
        </DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-2">
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
            rows={10}
            className="min-w-0 w-full break-words whitespace-normal resize-y"
          />
          <div className="flex items-center justify-between gap-3 mt-5">
            {editingId ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    if (typeof onClose === 'function') onClose()
                  }}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default" className="cursor-pointer">
                  Update
                </Button>
              </>
            ) : (
              <Button type="submit" variant="default" className="cursor-pointer w-full">
                Add Note
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
