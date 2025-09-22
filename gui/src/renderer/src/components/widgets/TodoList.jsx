import { useState, useRef, useCallback } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/8bit/card'
import { Button } from '@/components/ui/8bit/button'
import { Checkbox } from '@/components/ui/8bit/checkbox'
import { toast } from '@/components/ui/8bit/toast'
import { Input } from '@/components/ui/8bit/input'
import { useTodoStore, useTodoStats, useMaxTodos } from '@/stores/todoStore'

export default function TodoList() {
  const tasks = useTodoStore((state) => state.tasks)
  const addTask = useTodoStore((state) => state.addTask)
  const toggleTask = useTodoStore((state) => state.toggleTask)
  const deleteTask = useTodoStore((state) => state.deleteTask)
  const maxTodos = useMaxTodos()
  const stats = useTodoStats()

  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const handleAddTask = useCallback(
    (e) => {
      e.preventDefault()
      if (!text.trim()) return

      const success = addTask(text)
      if (!success) {
        toast(`Todo limit reached. Max ${maxTodos} tasks allowed.`)
        return
      }

      setText('')
      inputRef.current?.focus()
    },
    [text, addTask, maxTodos]
  )

  const handleToggle = useCallback(
    (id) => {
      toggleTask(id)
    },
    [toggleTask]
  )

  const handleRemove = useCallback(
    (id) => {
      const taskToRemove = tasks.find((t) => t.id === id)
      if (taskToRemove) {
        toast(`Task deleted.`)
      }
      deleteTask(id)
    },
    [tasks, deleteTask]
  )

  const { total, completed } = stats

  return (
    <Card>
      <CardHeader>
        <CardTitle>To-Do</CardTitle>
        <CardDescription className="pt-2">
          {completed} / {total} completed
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleAddTask} className="flex gap-4 mb-5">
          <Input
            ref={inputRef}
            aria-label="New task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add task..."
            className="flex-1"
          />
          <Button type="submit" className="mt-2 cursor-pointer">
            Add
          </Button>
        </form>

        <ul className="space-y-2">
          {tasks.length === 0 && <li className="text-sm text-gray-400 mt-5">No tasks yet.</li>}

          {tasks.map((t) => (
            <li key={t.id} className="mt-2 flex items-center gap-3 p-2 min-w-0">
              <Checkbox
                checked={t.done}
                onCheckedChange={() => handleToggle(t.id)}
                aria-label={`Mark ${t.text} as ${t.done ? 'not done' : 'done'}`}
                className="cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <span
                  className={`block max-w-[35ch] whitespace-normal break-words ${
                    t.done ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {t.text}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemove(t.id)}
                className="cursor-pointer"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
