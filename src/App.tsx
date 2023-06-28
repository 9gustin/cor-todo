import { useLayoutEffect } from "react";
import { TodoList, CreateTodoForm } from "./components";
import { useCustomizables } from "./context";

function App() {
  const { loadData } = useCustomizables();

  useLayoutEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <main className="p-6">
      <CreateTodoForm />
      <TodoList />
    </main>
  );
}

export default App;
