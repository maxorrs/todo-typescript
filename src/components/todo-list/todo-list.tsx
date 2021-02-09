import React from 'react';
import TodoItem from '../todo-item/todo-item';
import { Todo } from '../../types/todo';

import './todo-list.css';

enum Mode {
  MAIN = 'MAIN',
  DONE = 'DONE'
}

interface TodoListProps {
  todos: Todo[],
  onDeleteTodo: (id: number) => void,
  onChangeTodo: (id: number) => void,
  onUpdateTitle: (id: number, newTitle: string) => void,
  onChangeStatus: (id: number) => void,
  mode: keyof typeof Mode,
  onDeleteAllTodos: (mode: keyof typeof Mode) => void,
};

const getCountTodos = (mode: keyof typeof Mode, todos: Todo[]): number => {
  switch (mode) {
    case Mode.MAIN:
      return todos.filter((todo) => todo.isDone === false).length;
    case Mode.DONE:
      return todos.filter((todo) => todo.isDone === true).length;
    default:
      return 0;
  }
}

const TodoList: React.FC<TodoListProps> = ({ mode, todos, onDeleteTodo, onChangeTodo, onUpdateTitle, onChangeStatus, onDeleteAllTodos }) => {
  const countTodos = getCountTodos(mode, todos);

  return (
    <section className="todo-list">
      <header className="todo-list__header">
        <h2 className="todo-list__title">{mode === Mode.MAIN ? `Незавершенные дела – ${countTodos}` : `Завершенные дела – ${countTodos}`}</h2>
        <button type="button" onClick={() => onDeleteAllTodos(mode)}>Удалить все</button>
      </header>
      <ol className="todo-list__list">
        {
          todos.map((todo: Todo) => {
            return (
              <li key={todo.id} className="todo-list__item">
                <TodoItem
                  todo={todo}
                  onDeleteTodo={onDeleteTodo}
                  onChangeTodo={onChangeTodo}
                  onUpdateTitle={onUpdateTitle}
                  onChangeStatus={onChangeStatus} />
              </li>
            )
          })
        }
      </ol>
    </section>
  );
};

export default TodoList;
