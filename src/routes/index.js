import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { menu } from "./menu";
import Login from "../pages/auth/Login";
import Navbar from "../components/Navbar";

const Routes = () => {
  const { user } = useSelector((state) => state);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {menu && menu.map((menu, index) => (
              <RouteWithSubRoutes
                key={`${index + 1}${menu}`}
                exact={menu.exact}
                routeType={menu.type}
                nestedRoute={menu.nested}
                path={menu.path}
                component={menu.lazyComponent}
                authed={user.auth}
              />
            ))}
          <Route
            path={"/login"}
            render={(props) => <Login />}
          />
          <Route render={(props) => <>not page found</>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const RouteWithSubRoutes = ({ component: Component, ...rest }) => {
  return (
    <div>
      <Navbar />
      <React.Suspense fallback={"loading..."}>
        <Route
          {...rest}
          render={(props) => {
            console.log("DEBUG_AUTH", rest);
            if (rest.authed) {
              if (rest.routeType === "single") {
                return <Component {...props} />;
              }
              if (rest.routeType === "nested") {
                return RouteWithNestedRoutes(rest);
              }
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
      </React.Suspense>
    </div>
  );
};

const RouteWithNestedRoutes = (rest) => {
  return (
    <Switch>
      {NestedRouteLoop(rest)}
      <Route render={(props) => <>not page found</>} />
    </Switch>
  );
};

const NestedRouteLoop = (rest) => {
  return rest.nestedRoute.map((menu, menuIndex) => (
    <Route
      {...rest}
      key={menuIndex}
      exact={menu.exact}
      path={menu.path}
      render={(props) => <menu.lazyComponent {...props} />}
    />
  ));
};

export default Routes;
