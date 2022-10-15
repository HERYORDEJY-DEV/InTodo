import {TodoType} from './todo';

export type TotoInitialStateType = {
  todos: Array<TodoType>;
};

export type TodoContextType = {
  todos: TodoType[];
  onAddTodo: (todo: TodoType) => void;
  onEditTodo: (id: number, data: TodoType) => void;
  onCompleteTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onLoadTodos: (todo: Array<TodoType>) => void;
};
