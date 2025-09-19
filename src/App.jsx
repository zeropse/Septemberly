import Notes from "./components/Notes";
import TodoList from "./components/TodoList";
import Pomodoro from "./components/Pomodoro";
import WeatherWidget from "./components/WeatherWidget";
import Quote from "./components/Quote";

const App = () => {
  return (
    <div className="max-w-[920px] mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Septemberly</h1>
      </header>

      <main className="grid gap-4" style={{ gridTemplateColumns: "1fr 320px" }}>
        <section>
          <Notes />
        </section>

        <aside>
          <TodoList />
          <div />
          <Pomodoro />
          <div />
          <WeatherWidget defaultCity="San Francisco" />
          <div />
          <Quote />
        </aside>
      </main>
    </div>
  );
};

export default App;
