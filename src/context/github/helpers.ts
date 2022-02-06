import * as React from 'react';

// constants
import { BASE_URL_GITHUB, PER_PAGE } from '../../constants';
// types
import { User } from '../../types/User';
// actions
import { AdjustmentAction } from './reducer';

// if page is provided, that means that we are fetching more users rather than initializing
export const fetchUsers = async (
  term: string,
  dispatch: React.Dispatch<AdjustmentAction>,
  page?: number,
): Promise<User[]> => {
  const response = await fetch(
    `${BASE_URL_GITHUB}?q=${term}&per_page=${PER_PAGE}&page=${
      page ? page + 1 : 1
    }`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();

  if (!page) dispatch({ type: 'set_total_count', payload: json.total_count });
  if (page) dispatch({ type: 'set_page', payload: page + 1 });

  const users = json.items.map((user: User) => ({
    id: user.id,
    login: user.login,
    avatar_url: user.avatar_url,
    html_url: user.html_url,
    repos_url: user.repos_url,
  }));

  return users;
};
