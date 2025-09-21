import React from "react";
const Notes = React.lazy(() => import("@/components/widgets/Notes"));
const Pomodoro = React.lazy(() => import("@/components/widgets/Pomodoro"));
const Quote = React.lazy(() => import("@/components/widgets/Quote"));
const TodoList = React.lazy(() => import("@/components/widgets/TodoList"));
const WeatherWidget = React.lazy(() =>
  import("@/components/widgets/WeatherWidget")
);

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
