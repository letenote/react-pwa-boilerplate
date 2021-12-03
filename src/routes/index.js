import React, { Component, Suspense } from "react";
import publicMenus from './publicMenus';
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const PublicRoute = React.lazy(() => import("./PublicRoute"));
const Main = React.lazy(() => import("../layouts/Main"));
// const PrivateRoute = React.lazy(() => import("./PrivateRoute"));

class Routes extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  
  // componentDidMount(){
  //   const { __CheckAuthAction } = this.props;
  //   return __CheckAuthAction()
  // };

  render() {
    // const { config, user } = this.props;
    // if(!config.sync){
    //   return <SplashScreen message={config.syncMessage}/>
    // }
    return (
      <Suspense fallback={<div>Loading..</div>}>
        <BrowserRouter>
          <Switch>
            {publicMenus.map((menu, menuIndex) => (
              <PublicRoute
                key={`${menuIndex + 1}${menu}`}
                authed={false}
                exact={menu.exact}
                routeType={menu.type}
                nestedRoute={menu.nested}
                path={menu.path}
                component={menu.lazyComponent}
              />
            ))}
            {/* {config.user.menus.map((menu, index) => (
              <PrivateRoute
                key={`${index + 1}${menu}`}
                // exact
                exact={menu.exact}
                authed={user.authed}
                routeType={menu.type}
                nestedRoute={menu.nested}
                path={menu.path}
                component={menu.lazyComponent}
              />
            ))} */}
            <Route 
              render={(props) => (
                <Main>
                  <>
                    Sorry, the page you visited does not exist.
                  </>
                </Main>
              )} 
            />
          </Switch>
        </BrowserRouter>
      </Suspense>
    );
  }
}

// Routes.propTypes = {
//   config: PropTypes.oneOfType([PropTypes.object]).isRequired,
// };

function mapStateToProps(state) {
  return {
    // config: state.config,
    // user: state.user
  };
}

const mapActionsToProps = {
  // __CheckAuthAction: UserActions.checkAuth
};

export default connect(mapStateToProps,mapActionsToProps)(Routes);