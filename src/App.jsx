import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  // Array of todos
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // set the state of todos to the new todo
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    // update the todo with the new todo
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    // delete the todo with the given id
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    // toggle the completed state of the todo with the given id
    setTodos((prev) =>
      prev.map((prevTodo) =>
        // if the id matches, toggle only the completed state
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    // fetch todos from the local storage (string to JSON)
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    // save todos to local storage (JSON to string)
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-slate-900 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto rounded-lg px-4 py-3 text-white">
          <h1 className="text-3xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-col gap-4">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No todos to display</p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
