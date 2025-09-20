import { ModeToggle } from "@/style/mode-toggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold tracking-wide flex items-center gap-2">
        🌿 Septemberly
      </h1>
      <ModeToggle />
    </header>
  );
};
export default Header;
