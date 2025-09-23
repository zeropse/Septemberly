import {
  IconNotes,
  IconHourglassEmpty,
  IconCloud,
  IconChecks,
  IconHome,
} from "@tabler/icons-react";
import React from "react";
const Home = React.lazy(() => import("@/components/widgets/Home"));
const Notes = React.lazy(() => import("@/components/widgets/Notes"));
const Pomodoro = React.lazy(() => import("@/components/widgets/Pomodoro"));
const TodoList = React.lazy(() => import("@/components/widgets/TodoList"));
const WeatherWidget = React.lazy(() =>
  import("@/components/widgets/WeatherWidget")
);
const widgets = [
  {
    id: "home",
    label: "Home",
    component: Home,
    emoji: <IconHome size={24} />,
    color: "bg-chart-1",
  },
  {
    id: "notes",
    label: "Notes",
    component: Notes,
    emoji: <IconNotes size={24} />,
    color: "bg-chart-1",
  },
  {
    id: "todo",
    label: "Todo",
    component: TodoList,
    emoji: <IconChecks size={24} />,
    color: "bg-chart-1",
  },
  {
    id: "pomodoro",
    label: "Pomodoro",
    component: Pomodoro,
    emoji: <IconHourglassEmpty size={24} />,
    color: "bg-chart-1",
  },
  {
    id: "weather",
    label: "Weather",
    component: WeatherWidget,
    emoji: <IconCloud size={24} />,
    color: "bg-chart-1",
  },
];

export default widgets;
