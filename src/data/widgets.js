import Notes from "@/components/widgets/Notes";
import Pomodoro from "@/components/widgets/Pomodoro";
import Quote from "@/components/widgets/Quote";
import TodoList from "@/components/widgets/TodoList";
import WeatherWidget from "@/components/widgets/WeatherWidget";

const widgets = [
  {
    id: "notes",
    label: "Notes",
    component: Notes,
    emoji: "📝",
    color: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    id: "todo",
    label: "Todo",
    component: TodoList,
    emoji: "✅",
    color: "bg-green-500/10 border-green-500/20",
  },
  {
    id: "pomodoro",
    label: "Pomodoro",
    component: Pomodoro,
    emoji: "⏱️",
    color: "bg-red-500/10 border-red-500/20",
  },
  {
    id: "weather",
    label: "Weather",
    component: WeatherWidget,
    emoji: "☀️",
    color: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "quote",
    label: "Quote",
    component: Quote,
    emoji: "💬",
    color: "bg-purple-500/10 border-purple-500/20",
  },
];
export default widgets;
