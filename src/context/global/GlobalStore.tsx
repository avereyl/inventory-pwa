import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { ThemeMode } from "../../types/Themes";
import Reducer from "./GlobalReducer";
import {
  CheckedLineBehavior,
  GlobalContextType,
  GlobalState,
  PersistenceType,
} from "./types";

export const STATE_NAME: string = "splv_inventory_state";

/**
 * React Context-based global store with a reducer
 * and persistent. Saves to sessionStorage or localStorage
 **/
export const GlobalStore = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [state, dispatch] = useReducer(Reducer, initializeState());
  const initialRenderGlobalState = useRef(true);
  const initialRenderPersistenceType = useRef(true);

  useEffect(() => {
    /*
     populate either sessionStorage or localStorage
     data from globalState based on persistenceType
    */
    if (initialRenderGlobalState.current) {
      initialRenderGlobalState.current = false;
      return;
    }
    const persistenceType = state.persistenceType;
    if (persistenceType === PersistenceType.SESSION_STORAGE) {
      sessionStorage.setItem(STATE_NAME, JSON.stringify(state));
    } else if (persistenceType === PersistenceType.LOCAL_STORAGE) {
      localStorage.setItem(STATE_NAME, JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    /*
     purge sessionStorage or localStorage when either is selected
    */
    if (initialRenderPersistenceType.current) {
      initialRenderPersistenceType.current = false;
      return;
    }
    const persistenceType = state.persistenceType;
    if (persistenceType === PersistenceType.SESSION_STORAGE) {
      localStorage.removeItem(STATE_NAME);
    } else if (persistenceType === PersistenceType.LOCAL_STORAGE) {
      sessionStorage.removeItem(STATE_NAME);
    }
  }, [state.persistenceType]);

  return (
    <globalContext.Provider value={{ state, dispatch }}>
      {children}
    </globalContext.Provider>
  );
};

export const globalContext = createContext({} as GlobalContextType);

export const initialState: GlobalState = {
  persistenceType: PersistenceType.LOCAL_STORAGE,
  userSettings: {
    theme: ThemeMode.LIGHT,
    checkedLineBehavior: CheckedLineBehavior.CROSS_OUT,
  },
  progresses: [],
};

export const useGlobalContext = () => useContext(globalContext);

const initializeState = () => {
  /*
   the order in which the the data is compared is very important;
   first try to populate the state from Storage if not return initialState
  */

  if (typeof Storage !== "undefined") {
  } else {
    throw new Error("You need to enable Storage to run this app properly.");
  }

  const fromLocalStorage = JSON.parse(
    localStorage.getItem(STATE_NAME) as string
  );
  const fromSessionStorage = JSON.parse(
    sessionStorage.getItem(STATE_NAME) as string
  );
  return (fromSessionStorage ||
    fromLocalStorage ||
    initialState) as GlobalState;
};
