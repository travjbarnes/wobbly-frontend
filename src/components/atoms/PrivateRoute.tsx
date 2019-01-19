import * as React from "react";
import { Route, Redirect } from "../../router";

interface IPrivateRouteProps {
  component: JSX.Element | React.ComponentElement<{}, React.Component<{}, any, any>>;
  auth: boolean;
}

/** Used for react-router routes that should only be accessible when authenticated. */
const PrivateRoute: React.SFC<IPrivateRouteProps & any> = ({ component, auth, ...rest }) => {
  const render = (props: any) => (auth ? React.createElement(component, props) : <Redirect to="/login" />);
  return <Route {...rest} render={render} />;
};

export const UnauthenticatedRoute: React.SFC<IPrivateRouteProps & any> = ({ component, auth, ...rest }) => {
  const render = (props: any) => (!auth ? React.createElement(component, props) : <Redirect to="/groups" />);
  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
