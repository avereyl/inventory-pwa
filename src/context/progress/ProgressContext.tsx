import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import Reducer from "./ProgressReducer";
import { ProgressContextType, ProgressState } from "./types";

export const STATE_NAME: string = "splv_inventory_progress"; // to be saved maybe

/**
 * React Context-based Progress store with its reducer.
 **/
export const ProgressStore = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [state, dispatch] = useReducer(Reducer, initializeState());

  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const ProgressContext = createContext({} as ProgressContextType);

export const initialState: ProgressState = {
  progresses: [],
};

export const useProgressContext = () => useContext(ProgressContext);

const initializeState = () => {
  return initialState as ProgressState;
};
