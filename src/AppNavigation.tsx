import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  NavigationInjectedProps
} from "react-navigation";

import {
  AccountScreen,
  CreateGroupScreen,
  CreateThreadScreen,
  GroupDetailsScreen,
  GroupsListScreen,
  JoinGroupScreen,
  LoginScreen,
  SearchGroupsModal,
  SignupScreen,
  SplashScreen,
  ThreadScreen,
  ThreadsListScreen,
  WelcomeScreen
} from "./components/screens";
import SettingsScreen from "./components/screens/SettingsScreen";

// Main app stacks
const GroupsStack = createStackNavigator({
  GroupsList: GroupsListScreen,
  ThreadsList: ThreadsListScreen,
  Thread: ThreadScreen,
  GroupDetails: GroupDetailsScreen
});
GroupsStack.navigationOptions = ({ navigation }: NavigationInjectedProps) => {
  const tabBarVisible = navigation.state.index === 0;
  return { tabBarVisible };
};
const AccountStack = createStackNavigator({
  Account: AccountScreen,
  Settings: SettingsScreen
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

// Modal stack for searching/creating a group
const CreateNodeFlow = createStackNavigator({
  SearchGroups: SearchGroupsModal,
  CreateGroup: CreateGroupScreen,
  JoinGroup: JoinGroupScreen
});

// Modal stack for creating a new thread
const CreateThreadFlow = createStackNavigator({
  CreateThread: CreateThreadScreen
});

// Authentication stack
const AuthStack = createStackNavigator({
  Welcome: WelcomeScreen,
  Signup: SignupScreen,
  Login: LoginScreen
});

// Put modals here (as long as they only need to be accessible from within `AppTabs`)
const RootNavigator = createStackNavigator(
  {
    AppTabs,
    CreateNodeFlow,
    CreateThreadFlow
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

// Auth/main app switch
export default createAppContainer(
  createSwitchNavigator(
    {
      App: RootNavigator,
      Auth: AuthStack,
      Splash: SplashScreen
    },
    {
      initialRouteName: "Splash"
    }
  )
);
