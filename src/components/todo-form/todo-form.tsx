import React, { useState } from 'react';
import { Todo } from '../../types/todo';

import './todo-form.css';

interface TodoFormProps {
  onAddTodo: (newTodo: Todo) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState<string>('');

  const setTitleHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setTitle(value);
  }

  const addTodoHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const newTodo: Todo = {
      id: Date.now(),
      title,
      needEdit: false,
      isDone: false
    };

    onAddTodo(newTodo);
    setTitle('');
  }

  return (
    <form className="todo-form" onSubmit={addTodoHandler}>
      <p className="todo-form__wrapper-input">
        <label className="todo-form__label" htmlFor="name">Введите название дела</label>
        <input className="todo-form__input" onChange={setTitleHandler} value={title} type="text" id="name" placeholder="Купить молоко" autoComplete="off" />
      </p>
      <button className="button todo-form__button" type="submit">Добавить</button>
    </form>
  );
};

export default TodoForm;
