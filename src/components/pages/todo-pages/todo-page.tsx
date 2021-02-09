import React, { useEffect, useState } from 'react';

import TodoForm from '../../todo-form/todo-form';
import TodoList from '../../todo-list/todo-list';

import { Todo } from '../../../types/todo';
import { Mode } from '../../../types/enums';
import { filterTodos } from '../../../utils/filter';

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const setTodosHandler = (newTodo: Todo) => {

    if (!newTodo.title) {
      return;
    }

    setTodos((prevState: Todo[]) => [newTodo, ...prevState]);
  }

  const deleteTodoHandler = (id: number) => {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
  };

  const changeTodoHandler = (id: number) => {
    setTodos((prevState) => prevState.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          needEdit: !todo.needEdit
        };
      }

      return todo;
    }));
  };

  const updateTitleHandler = (id: number, newTitle: string) => {
    setTodos((prevState) => prevState.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: newTitle,
          needEdit: false,
        };
      }

      return todo;
    }));
  };

  const changeStatusHandler = (id: number) => {
    setTodos((prevState) => prevState.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: !todo.isDone
        };
      }

      return todo;
    }));
  };

  const deleteAllTodosHandler = (mode: keyof typeof Mode) => {
    if (mode === Mode.MAIN) {
      setTodos((prevState) => prevState.filter((todo) => todo.isDone !== false));
    }

    if (mode === Mode.DONE) {
      setTodos((prevState) => prevState.filter((todo) => todo.isDone === false));
    }
  }

  const mainTodos = filterTodos(Mode.MAIN, todos);
  const doneTodos = filterTodos(Mode.DONE, todos);

  useEffect(() => {
    const todosStorage = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(todosStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <main className="page page--todo">
      <h1 className="page__title">Список дел</h1>
      <TodoForm onAddTodo={setTodosHandler} />
      {
        mainTodos.length ?
          <TodoList
            mode={Mode.MAIN}
            todos={mainTodos}
            onDeleteTodo={deleteTodoHandler}
            onChangeTodo={changeTodoHandler}
            onUpdateTitle={updateTitleHandler}
            onChangeStatus={changeStatusHandler}
            onDeleteAllTodos={deleteAllTodosHandler} />
          : <p>Запланированных дел нет</p>
      }
      {
        doneTodos.length ?
          <TodoList
            mode={Mode.DONE}
            todos={doneTodos}
            onDeleteTodo={deleteTodoHandler}
            onChangeTodo={changeTodoHandler}
            onUpdateTitle={updateTitleHandler}
            onChangeStatus={changeStatusHandler}
            onDeleteAllTodos={deleteAllTodosHandler} /> : null
      }

    </main>
  );
};

export default TodoPage;
