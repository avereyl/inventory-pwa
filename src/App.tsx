import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { GlobalStore } from "./context/global/GlobalStore";
import { ProgressStore } from "./context/progress/ProgressContext";
import "./i18n";
import AboutView from "./views/AboutView";
import HelpView from "./views/HelpView";
import HomeView from "./views/HomeView";
import InventoryView from "./views/InventoryView";
import SettingsView from "./views/SettingsView";

function App() {
  return (
    <GlobalStore>
      <ErrorBoundary>
        <ProgressStore>
          <Router>
            <Switch>
              <Route path="/help">
                <HelpView />
              </Route>
              <Route path="/about">
                <AboutView />
              </Route>
              <Route path="/settings">
                <SettingsView />
              </Route>
              <Route path="/check/:locationType">
                <InventoryView />
              </Route>
              <Route path="/">
                <HomeView />
              </Route>
            </Switch>
          </Router>
        </ProgressStore>
      </ErrorBoundary>
    </GlobalStore>
  );
}

export default App;
