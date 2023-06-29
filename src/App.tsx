import { useLayoutEffect } from "react";
import { useCustomizables } from "./context";
import { TodoList, CreateTodoForm } from "./components";

function App() {
  const { loadData } = useCustomizables();

  useLayoutEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="p-6 md:grid md:grid-cols-6 gap-6">
      <aside className="md:col-span-2 md:border-r-2 md:border-gray-100 md:pr-6">
        <CreateTodoForm />
      </aside>
      <main className="md:col-span-4">
        <TodoList />
      </main>
    </div>
  );
}

export default App;
