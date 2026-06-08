import Main from "./components/Main";

export default function MyCalendar() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="w-full px-10 py-5 border-b border-white/10">
        <h1 className="text-white text-2xl font-bold tracking-widest">
          CLASS SCHEDULE MAKER
        </h1>
      </header>
      <Main />
    </div>
  );
}