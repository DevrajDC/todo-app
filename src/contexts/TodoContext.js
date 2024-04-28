import { createContext, useContext } from "react";

// create a context
export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Learn React",
      completed: false,
    }
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

// custom hook to access the context
export const useTodo = () => useContext(TodoContext);

// provider component
export const TodoProvider = TodoContext.Provider;