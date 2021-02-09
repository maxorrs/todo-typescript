import {Mode} from '../types/enums';
import {Todo} from '../types/todo';

export const filterTodos = (mode: keyof typeof Mode, todos: Todo[]) => {
  switch (mode) {
    case Mode.MAIN:
      return todos.slice().filter((todo: Todo) => todo.isDone === false);
    case Mode.DONE:
      return todos.slice().filter((todo: Todo) => todo.isDone === true);
    default:
      return todos;
  }
};

