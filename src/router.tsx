import { Platform } from "react-native";
import * as NativeRouterPackage from "react-router-native";

const RouterPackage = Platform.select({
  android: () => require("react-router-native"),
  ios: () => require("react-router-native"),
  web: () => require("react-router-dom")
})();
const Router = Platform.select({
  android: () => RouterPackage.NativeRouter,
  ios: () => RouterPackage.NativeRouter,
  web: () => RouterPackage.BrowserRouter
})();
// Using these components from the browser router causes problems with react-native-web
const { Route, Link, Redirect } = NativeRouterPackage;

export { Router, Route, Link, Redirect };
