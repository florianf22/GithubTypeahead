import * as React from 'react';
// actions
import { AdjustmentAction } from './reducer';
// helpers
import { fetchUsers } from './helpers';

export const fetchAndSetUsers = async (
  term: string,
  dispatch: React.Dispatch<AdjustmentAction>,
): Promise<void> => {
  const users = await fetchUsers(term, dispatch);

  dispatch({ type: 'set_users', payload: users });
};

export const fetchMoreUsers = async (
  term: string,
  page: number,
  dispatch: React.Dispatch<AdjustmentAction>,
): Promise<void> => {
  const users = await fetchUsers(term, dispatch, page);

  dispatch({ type: 'add_users', payload: users });
};

export const clearUsers = (
  dispatch: React.Dispatch<AdjustmentAction>,
): void => {
  dispatch({ type: 'set_users', payload: [] });
};
