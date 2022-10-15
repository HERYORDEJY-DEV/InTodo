import React, {createContext, ReactNode} from 'react';
import {TodoContextType} from '../types/context';
import {TodoType} from '../types/todo';

export const TodoContext = createContext<TodoContextType | null>(null);

interface Props {
  children: ReactNode;
}

export default function TodoProvider({children}: Props) {
  const [todos, setTodos] = React.useState<Array<TodoType>>([]);

  const onAddTodo = (todo: TodoType) => {
    const newTodo: TodoType = {
      userId: todo.userId ?? 100,
      id: todos.length + 1,
      title: todo.title,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const onEditTodo = (id: number, data: TodoType) => {
    let ts = todos.map((todo: TodoType) => {
      if (todo.id === id) {
        return data;
      }
      return todo;
    });
    setTodos(ts);
  };

  const onCompleteTodo = (id: number) => {
    const ts = todos.map((todo: TodoType) => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed};
      }
      return todo;
    });
    setTodos(ts);
  };

  const onDeleteTodo = (id: number) => {
    const ts = todos.filter((todo: TodoType) => todo.id !== id);
    setTodos(ts);
  };

  const onLoadTodos = (todos: Array<TodoType>) => {
    setTodos(todos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        onAddTodo,
        onEditTodo,
        onCompleteTodo,
        onDeleteTodo,
        onLoadTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
