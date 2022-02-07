// types
import { GithubInfo } from '../../types/GithubInfo';
import { User } from '../../types/User';

type UsersAction = {
  type: 'set_users' | 'add_users';
  payload: User[];
};

type MetaDataAction = {
  type: 'set_info';
  payload: GithubInfo;
};

type NoResultAction = {
  type: 'set_no_result' | 'set_has_result';
};

export type AdjustmentAction = UsersAction | MetaDataAction | NoResultAction;

export interface StateType {
  users: User[];
  term: string;
  totalCount: number;
  page: number;
  noResult: boolean;
}

export const reducer = (
  state: StateType,
  action: AdjustmentAction,
): StateType => {
  switch (action.type) {
    case 'set_users': {
      return {
        ...state,
        users: action.payload,
      };
    }
    case 'add_users': {
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    }
    case 'set_info': {
      return {
        ...state,
        term: action.payload.term,
        totalCount: action.payload.totalCount,
        page: action.payload.page,
      };
    }
    case 'set_no_result': {
      return {
        ...state,
        noResult: true,
      };
    }
    case 'set_has_result': {
      return {
        ...state,
        noResult: false,
      };
    }

    default: {
      return state;
    }
  }
};
