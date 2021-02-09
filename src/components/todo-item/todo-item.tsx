import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/todo';

import './todo-item.css';

interface TodoItemProps {
  todo: Todo,
  onDeleteTodo: (id: number) => void
  onChangeTodo: (id: number) => void,
  onUpdateTitle: (id: number, newTitle: string) => void,
  onChangeStatus: (id: number) => void,
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDeleteTodo, onChangeTodo, onUpdateTitle, onChangeStatus }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { id, title, needEdit, isDone } = todo;

  const [newTitle, setNewTitle] = useState<string>(title);

  const changeNewTitleHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target;
    setNewTitle(value);
  }

  useEffect(() => {
    if (inputRef.current && needEdit) {
      inputRef.current.focus();
    }

    inputRef.current!.style.height = '26px';
    inputRef.current!.style.height = inputRef.current!.scrollHeight + 'px';
  });

  const enterSaveHandler = (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (evt.key === 'Enter') {
      if (newTitle === '') {
        onDeleteTodo(id);
        return;
      }
      onUpdateTitle(id, newTitle);
    }
  }

  const changeTodoHandler = () => {
    onChangeTodo(id);
    if (newTitle !== title) {
      onUpdateTitle(id, newTitle);
    }
  };

  return (
    <section className="todo-item">
      <input className="todo-item__checkbox" type="checkbox" name="done" checked={isDone} onChange={() => onChangeStatus(id)} />
      <textarea
        ref={inputRef}
        onKeyDown={enterSaveHandler}
        className="todo-item__input"
        value={newTitle}
        readOnly={!needEdit}
        onChange={changeNewTitleHandler}>
        {newTitle}
      </textarea>
      <button className="todo-item__button todo-item__button--change button" type="button" disabled={isDone} onClick={changeTodoHandler}>{needEdit ? 'Сохранить' : 'Изменить'}</button>
      <button className="todo-item__button todo-item__button--delete button" type="button" disabled={needEdit} onClick={() => onDeleteTodo(id)}>Удалить</button>
    </section>
  );
};

export default TodoItem;
