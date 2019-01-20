import * as React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import { Ionicons } from "@expo/vector-icons";

import { AccountScreen, GroupsScreen, LoginScreen } from "./components/screens";
import SplashScreen from "./components/screens/SplashScreen";

// Main app stacks
const GroupsStack = createStackNavigator({
  GroupsList: GroupsScreen
});
const AccountStack = createStackNavigator({
  Account: AccountScreen
});

// Main app tabs
const AppTabs = createBottomTabNavigator(
  {
    Groups: GroupsStack,
    Account: AccountStack
  },
  {
    initialRouteName: "Groups",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const routeName = navigation.state.routeName;
        const IconComponent = Ionicons;
        let iconName;
        if (routeName === "Groups") {
          iconName = "ios-chatboxes";
        } else if (routeName === "Account") {
          iconName = "ios-contact";
        }
        return <IconComponent name={iconName || ""} size={25} color={tintColor || undefined} />;
      }
    })
  }
);

// Auth/main app switch
export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppTabs,
      Auth: LoginScreen,
      Splash: SplashScreen
    },
    {
      initialRouteName: "Splash"
    }
  )
);
