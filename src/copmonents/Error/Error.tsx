import classNames from 'classnames';
import React, { useEffect } from 'react';

type Props = {
  error: string;
  setError: (error: string) => void;
};

export const ErrorNotification: React.FC<Props> = ({ error, setError }) => {
  useEffect(() => {
    if (!error) {
      return;
    }

    const timerId = setTimeout(() => {
      setError('');
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error, setError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !error,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError('')}
      />
      {error}

      {/* show only one message at a time */}
      {/* Unable to load todos
    <br />
    Title should not be empty
    <br />
    Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo */}
    </div>
  );
};
