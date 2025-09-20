import { useState, useRef, useCallback, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";
import { Checkbox } from "@/components/ui/8bit/checkbox";
import { toast } from "@/components/ui/8bit/toast";
import { Input } from "@/components/ui/8bit/input";

const STORAGE_KEY = "todos";
const MAX_TODOS = 10;

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export default function TodoList() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to load todos", e);
      return [];
    }
  });

  const [text, setText] = useState("");
  const inputRef = useRef(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to save todos", e);
    }
  }, [tasks]);

  const addTask = useCallback(
    (e) => {
      e.preventDefault();
      if (!text.trim()) return;

      if (tasks.length >= MAX_TODOS) {
        toast(`Todo limit reached. Max ${MAX_TODOS} tasks allowed.`);
        return;
      }

      const newTask = {
        id: uid(),
        text: text.trim(),
        done: false,
      };

      setTasks((prev) => [newTask, ...prev]);
      setText("");
      inputRef.current?.focus();
    },
    [text, tasks]
  );

  const toggle = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const remove = useCallback(
    (id) => {
      const taskToRemove = tasks.find((t) => t.id === id);
      if (taskToRemove) {
        toast(`Task "${taskToRemove.text}" deleted.`);
      }
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [tasks]
  );

  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>To-Do</CardTitle>
        <CardDescription className="pt-2">
          {completed} / {total} completed
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={addTask} className="flex gap-4">
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
          {tasks.length === 0 && (
            <li className="text-sm text-gray-400 mt-5">No tasks yet.</li>
          )}

          {tasks.map((t) => (
            <li key={t.id} className="mt-2 flex items-center gap-3 p-2 min-w-0">
              <Checkbox
                checked={t.done}
                onCheckedChange={() => toggle(t.id)}
                aria-label={`Mark ${t.text} as ${t.done ? "not done" : "done"}`}
              />
              <div className="flex-1 min-w-0">
                <span
                  className={`block max-w-[40ch] whitespace-normal break-words ${
                    t.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {t.text}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => remove(t.id)}
                className="cursor-pointer"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
