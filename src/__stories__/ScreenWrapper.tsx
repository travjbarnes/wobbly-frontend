import { StoryDecorator } from "@storybook/react";
import React from "react";
import { Text, View } from "react-native";
import { Header } from "react-native-elements";
import { createNavigator, NavigationDescriptor, NavigationScreenOptions, StackRouter } from "react-navigation";

export interface IScreenWrapperProps extends IScreenLayoutProps {
  navigationOptions?: NavigationScreenOptions;
}

export function screenWrapper({ navigationOptions, ...layoutProps }: IScreenWrapperProps = {}): StoryDecorator {
  return children => {
    class Screen extends React.Component {
      public static navigationOptions = navigationOptions;

      public render() {
        return children();
      }
    }

    const { createBrowserApp } = require("@react-navigation/web");

    const Navigator = createNavigator(NavigationView, StackRouter({ Screen }, { initialRouteName: "Screen" }), {});
    const App = createBrowserApp(Navigator);

    return (
      <ScreenLayout {...layoutProps}>
        <App />
      </ScreenLayout>
    );
  };
}

interface IScreenLayoutProps {
  backgroundColor?: string;
  children?: React.ReactNode;
}

function ScreenLayout({ children, backgroundColor = "white" }: IScreenLayoutProps) {
  return (
    <View style={{ transform: [{ scale: 0.75 }, { translateX: -225 }] }}>
      <img style={{ position: "absolute" }} src={require("./phone.svg")} />
      <View
        style={{
          backgroundColor,
          display: "flex",
          position: "absolute",
          overflow: "hidden",
          left: 29,
          top: 109,
          height: 689,
          width: 390
        }}
      >
        {children}
      </View>
    </View>
  );
}

interface INavigationViewProps {
  descriptors: Record<string, NavigationDescriptor>;
  navigation: any;
}
function NavigationView({ descriptors, navigation }: INavigationViewProps) {
  const { SceneView } = require("@react-navigation/core");

  const activeKey = navigation.state.routes[navigation.state.index].key;
  const descriptor = descriptors[activeKey];
  const { headerStyle, header, headerTitleStyle, headerTitle, headerLeft, headerRight, title } = descriptor.options;
  const unwrapHeaderComponent = (x: typeof headerLeft) => (typeof x === "function" ? x({}) : x);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {header || (
        <Header
          leftComponent={unwrapHeaderComponent(headerLeft) || undefined}
          rightComponent={unwrapHeaderComponent(headerRight) || undefined}
          containerStyle={[{ backgroundColor: "tomato" }, headerStyle]}
          centerComponent={<Text style={headerTitleStyle}>{headerTitle || title}</Text>}
        />
      )}
      <SceneView component={descriptor.getComponent()} navigation={descriptor.navigation} />
    </View>
  );
}
