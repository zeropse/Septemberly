import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useGamificationStore } from './gamificationStore'

const MAX_TODOS = 10

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

export const useTodoStore = create(
  persist(
    (set, get) => ({
      // State
      tasks: [],

      // Actions
      addTask: (text) => {
        const state = get()
        if (!text.trim()) return false

        if (state.tasks.length >= MAX_TODOS) {
          return false
        }

        const newTask = {
          id: uid(),
          text: text.trim(),
          done: false,
          createdAt: Date.now()
        }

        set((state) => ({
          tasks: [newTask, ...state.tasks]
        }))

        return true
      },

      toggleTask: (id) => {
        set((state) => {
          const updatedTasks = state.tasks.map((task) => {
            if (task.id === id) {
              const updatedTask = { ...task, done: !task.done }

              // Award XP when completing a task
              if (updatedTask.done && !task.done) {
                setTimeout(() => {
                  useGamificationStore.getState().completeTask()
                }, 0)
              }

              return updatedTask
            }
            return task
          })

          return { tasks: updatedTasks }
        })
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        }))
      },

      clearCompleted: () => {
        set((state) => ({
          tasks: state.tasks.filter((task) => !task.done)
        }))
      }
    }),
    {
      name: 'todo-storage'
    }
  )
)

// Create computed selectors with proper caching
let cachedStats = null
let lastTasksLength = -1
let lastCompletedCount = -1

export const useTodoStats = () =>
  useTodoStore((state) => {
    const total = state.tasks.length
    const completed = state.tasks.filter((task) => task.done).length

    // Only create new object if values actually changed
    if (total !== lastTasksLength || completed !== lastCompletedCount) {
      lastTasksLength = total
      lastCompletedCount = completed
      cachedStats = {
        total,
        completed,
        remaining: total - completed
      }
    }

    return cachedStats
  })

let cachedCanAddTask = null
let lastCanAddTaskLength = -1

export const useCanAddTask = () =>
  useTodoStore((state) => {
    const tasksLength = state.tasks.length

    // Only recalculate if tasks length changed
    if (tasksLength !== lastCanAddTaskLength) {
      lastCanAddTaskLength = tasksLength
      cachedCanAddTask = tasksLength < MAX_TODOS
    }

    return cachedCanAddTask
  })

export const useMaxTodos = () => MAX_TODOS
