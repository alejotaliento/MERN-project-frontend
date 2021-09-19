//React Router Dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Routes
import routes from "./config/routes";

// hooks
import AuthProvider from "./providers/AuthProvider";

//Logos and SASS
//import logo from "./logo.svg";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouterWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

function RouterWithSubRoutes(route) {
  //console.log(route);
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
