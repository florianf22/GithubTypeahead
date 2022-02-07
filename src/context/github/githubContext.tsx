import React, { useReducer } from 'react';
import { StateType, AdjustmentAction, reducer } from './reducer';

interface GithubContextType extends StateType {
  dispatch: React.Dispatch<AdjustmentAction>;
}

const initialState: StateType = {
  users: [],
  term: '',
  page: 1,
  totalCount: 0,
  noResult: false,
};

export const GithubContext = React.createContext<GithubContextType>(
  initialState as GithubContextType,
);

export const GithubContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = React.useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state],
  );

  return (
    <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
  );
};
