import App from "../src/App";
import { vi, expect } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { mockPriorities, mockStatus } from "../src/services/mocks";

vi.mock("zustand", () => ({
  create: vi.fn(() => {
    return () => ({
      todos: [
        {
          id: "1",
          name: "Maquetar tooltip",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          status: mockStatus[1],
          priority: mockPriorities[2],
        },
        {
          id: "2",
          name: "Version desktop",
          description:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco",
          status: mockStatus[0],
          priority: mockPriorities[2],
        },
        {
          id: "3",
          name: "Some another task",
          description:
            "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum do",
          status: mockStatus[2],
          priority: mockPriorities[0],
        },
      ],
      addTodo: vi.fn(),
      loadData: vi.fn(),
      status: mockStatus,
      updateTodo: vi.fn(),
      deleteTodo: vi.fn(),
      priorities: mockPriorities,
    });
  }),
}));

describe("Task creation", () => {
  it("should render task form successfully", () => {
    render(<App />);
    expect(screen.getByText(/nueva tarea/i)).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: "Título" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Descripción" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Estado" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Prioridad" })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Crear" })).toBeInTheDocument();
  });
  it("should create a task successfully", async () => {
    render(<App />);

    act(() => {
      fireEvent.change(screen.getByRole("textbox", { name: "Título" }), {
        target: { value: "Tarea 1" },
      });

      fireEvent.change(screen.getByRole("textbox", { name: "Descripción" }), {
        target: { value: "Descripción de la tarea 1" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Crear" }));
    });

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "Título" })).toHaveValue("");
    });
  });
});

describe("Task view", () => {
  it("should render task list successfully", () => {
    render(<App />);
    expect(screen.getByText(/tareas/i)).toBeInTheDocument();

    expect(screen.getByText("Maquetar tooltip")).toBeInTheDocument();
    expect(screen.getByText("Version desktop")).toBeInTheDocument();
    expect(screen.getByText("Some another task")).toBeInTheDocument();

    expect(screen.getAllByRole("button", { name: /editar/i })).toHaveLength(3);
    expect(screen.getAllByRole("button", { name: /eliminar/i })).toHaveLength(
      3
    );
  });
  it("should can i edit task", () => {
    render(<App />);
    expect(screen.getAllByRole("combobox", { name: "Estado" })).toHaveLength(1);
    expect(screen.getAllByRole("combobox", { name: "Prioridad" })).toHaveLength(
      1
    );

    const editBtn = screen.getAllByRole("button", {
      name: /edit/i,
    })[0];

    expect(editBtn).toBeInTheDocument();

    fireEvent.click(editBtn);

    expect(
      screen.getByRole("button", {
        name: /guardar/i,
      })
    ).toBeInTheDocument();

    expect(screen.getAllByRole("combobox", { name: "Estado" })).toHaveLength(2);
    expect(screen.getAllByRole("combobox", { name: "Prioridad" })).toHaveLength(
      2
    );
  });
});

describe("Task sort and filters", () => {
  it("should render filters when have tasks", () => {
    render(<App />);

    mockStatus.forEach(({ name }) => {
      expect(screen.getByRole("button", { name })).toBeInTheDocument();
    });

    mockPriorities.forEach(({ name }) => {
      expect(
        screen.getByRole("button", { name: `Prioridad ${name}` })
      ).toBeInTheDocument();
    });
  });
  it("test priority filters", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Prioridad Alta" }));

    expect(screen.queryByText("Some another task")).toBeNull();
    expect(screen.queryByText("Version desktop")).not.toBeNull();
    expect(screen.queryByText("Maquetar tooltip")).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Prioridad Alta" }));
    expect(screen.queryByText("Some another task")).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Prioridad Baja" }));
    expect(screen.queryByText("Some another task")).not.toBeNull();
    expect(screen.queryByText("Version desktop")).toBeNull();
    expect(screen.queryByText("Maquetar tooltip")).toBeNull();
  });
  it("test status filters", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Nueva" }));
    expect(screen.queryByText("Some another task")).toBeNull();
    expect(screen.queryByText("Version desktop")).not.toBeNull();
    expect(screen.queryByText("Maquetar tooltip")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Nueva" }));
    expect(screen.queryByText("Some another task")).not.toBeNull();
    expect(screen.queryByText("Version desktop")).not.toBeNull();
    expect(screen.queryByText("Maquetar tooltip")).not.toBeNull();
  });
  it("should can i order elements", () => {
    render(<App />);

    expect(screen.getByText("Maquetar tooltip")).toBeInTheDocument();
    expect(screen.getByText("Version desktop")).toBeInTheDocument();
    expect(screen.getByText("Some another task")).toBeInTheDocument();
    const orderCombo = screen.getByRole("combobox", { name: "Ordenar por" });

    fireEvent.change(orderCombo, {
      target: { value: "priority" },
    });
    const tasks = screen.getByTestId("all-tasks").children;

    expect(tasks[2].textContent?.includes("Some another task")).toBeTruthy();
    expect(tasks[0].textContent?.includes("Maquetar tooltip")).toBeTruthy();
    expect(tasks[1].textContent?.includes("Version desktop")).toBeTruthy();

    act(() => {
      fireEvent.change(orderCombo, {
        target: { value: "status" },
      });
    });
    const tasksOrderedByStatus = screen.getByTestId("all-tasks").children;

    expect(
      tasksOrderedByStatus[2].textContent?.includes("Some another task")
    ).toBeTruthy();
    expect(
      tasksOrderedByStatus[1].textContent?.includes("Maquetar tooltip")
    ).toBeTruthy();
    expect(
      tasksOrderedByStatus[0].textContent?.includes("Version desktop")
    ).toBeTruthy();
  });
});
