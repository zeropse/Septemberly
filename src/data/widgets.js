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
    color: "bg-accent",
  },
  {
    id: "todo",
    label: "Todo",
    component: TodoList,
    emoji: "✅",
    color: "bg-accent",
  },
  {
    id: "pomodoro",
    label: "Pomodoro",
    component: Pomodoro,
    emoji: "⏱️",
    color: "bg-accent",
  },
  {
    id: "weather",
    label: "Weather",
    component: WeatherWidget,
    emoji: "☀️",
    color: "bg-accent",
  },
  {
    id: "quote",
    label: "Quote",
    component: Quote,
    emoji: "💬",
    color: "bg-accent",
  },
];
export default widgets;
