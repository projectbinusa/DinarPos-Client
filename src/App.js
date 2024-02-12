import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./auth/Login";
import Dashboard from "./views/admin/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <Switch>
            <Route path="/" component={Login} exact />
            {/* ROLE ADMIN */}
            <Route path="/dashboard_admin" component={Dashboard} exact />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
