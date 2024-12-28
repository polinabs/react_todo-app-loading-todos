/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
// import { UserWarning } from './UserWarning';
// import { USER_ID } from './api/todos';
import { Header } from './copmonents/Header/Header';
import { TodoList } from './copmonents/TodoList/TodoList';
import { Footer } from './copmonents/Footer/Footer';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorNotification } from './copmonents/Error/Error';

export const App: React.FC = () => {
  // if (!USER_ID) {
  //   return <UserWarning />;
  // }
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      });
  }, []);

  const filterTodosByStatus = useCallback(() => {
    if (filterStatus === 'all') {
      setFilteredTodos(todos);
    } else if (filterStatus === 'active') {
      setFilteredTodos(todos.filter(todo => !todo.completed));
    } else if (filterStatus === 'completed') {
      setFilteredTodos(todos.filter(todo => todo.completed));
    }
  }, [filterStatus, todos]);

  useEffect(() => {
    filterTodosByStatus();
  }, [filterTodosByStatus]);

  const todosActiveQuantity = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              setFilterStatus={setFilterStatus}
              filterStatus={filterStatus}
              todosActiveQuantity={todosActiveQuantity}
            />
          </>
        )}
      </div>

      <ErrorNotification error={errorMessage} setError={setErrorMessage} />
    </div>
  );
};
