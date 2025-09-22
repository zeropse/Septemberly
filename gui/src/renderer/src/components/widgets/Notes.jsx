import { useState, useMemo } from 'react'
import { useNotesStore } from '@/stores/notesStore'
import CreateNote from '@/components/widgets/CreateNote'
import NotesList from '@/components/widgets/NotesList'
import { toast } from '@/components/ui/8bit/toast'

export default function Notes() {
  const { addNote, updateNote, deleteNote } = useNotesStore()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [deleteDialogId, setDeleteDialogId] = useState(null)

  const resetForm = () => {
    setTitle('')
    setContent('')
    setEditingId(null)
  }

  const handleAddOrUpdate = (e) => {
    e.preventDefault()
    if (!title.trim() && !content.trim()) return

    if (editingId) {
      updateNote(editingId, {
        title: title.trim(),
        content: content.trim()
      })
    } else {
      addNote({
        title: title.trim(),
        content: content.trim()
      })
    }

    resetForm()
    return true
  }

  const [createOpen, setCreateOpen] = useState(false)

  const openCreateForNew = () => {
    resetForm()
    setCreateOpen(true)
  }

  const openCreateForEdit = (note) => {
    setEditingId(note.id)
    setTitle(note.title || '')
    setContent(note.content || '')
    setCreateOpen(true)
  }

  const handleDelete = (id) => {
    deleteNote(id)
    toast('Note Deleted')
    setDeleteDialogId(null)
  }

  const notes = useNotesStore((s) => s.notes)
  const filtered = useMemo(() => {
    return [...(notes || [])].sort((a, b) => {
      const ta = new Date(a.updatedAt || a.createdAt).getTime()
      const tb = new Date(b.updatedAt || b.createdAt).getTime()
      return tb - ta
    })
  }, [notes])

  return (
    <div className="space-y-4">
      <CreateNote
        open={createOpen}
        onOpenChange={(open) => setCreateOpen(open)}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        editingId={editingId}
        resetForm={resetForm}
        handleAddOrUpdate={(e) => {
          const res = handleAddOrUpdate(e)
          if (res) setCreateOpen(false)
          return res
        }}
        onClose={() => setCreateOpen(false)}
      />

      <NotesList
        notes={filtered}
        handleEdit={(note) => openCreateForEdit(note)}
        deleteDialogId={deleteDialogId}
        setDeleteDialogId={setDeleteDialogId}
        handleDelete={handleDelete}
        onOpenCreate={openCreateForNew}
      />
    </div>
  )
}
