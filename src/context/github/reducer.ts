// types
import { User } from '../../types/User';

type UsersAction = {
  type: 'set_users' | 'add_users';
  payload: User[];
};

type MetaDataAction = {
  type: 'set_page' | 'set_total_count';
  payload: number;
};

export type AdjustmentAction = UsersAction | MetaDataAction;

export interface StateType {
  users: User[];
  totalCount: number;
  page: number;
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
    case 'set_page': {
      return {
        ...state,
        page: action.payload,
      };
    }
    case 'set_total_count': {
      return {
        ...state,
        totalCount: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
