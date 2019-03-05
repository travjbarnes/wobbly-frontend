import { StoryDecorator } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { NavigationScreenOptions } from "react-navigation";

import { MockNavigator } from "./MockNavigator";

export interface IScreenWrapperProps extends IScreenLayoutProps {
  navigationOptions?: NavigationScreenOptions;
}
/**
 * Wrap a story in the
 */
export function screenWrapper({ navigationOptions, ...layoutProps }: IScreenWrapperProps = {}): StoryDecorator {
  return story => {
    class Screen extends React.Component {
      public static navigationOptions = navigationOptions;

      public render() {
        return story();
      }
    }

    return (
      <ScreenLayout {...layoutProps}>
        <MockNavigator screen={Screen} />
      </ScreenLayout>
    );
  };
}

/**
 * Render a screen component, optionally providing it with some navigation params
 */
export function screenStory(Screen: React.ComponentType<any>, params?: {}) {
  return () => (
    <ScreenLayout>
      <MockNavigator screen={Screen} navigationParams={params} />
    </ScreenLayout>
  );
}

interface IScreenLayoutProps {
  backgroundColor?: string;
  children?: React.ReactNode;
}
/**
 * Fixes the story dimensions to a phone screen size and renders a phone around the story if running interactively
 */
function ScreenLayout({ children, backgroundColor = "white" }: IScreenLayoutProps) {
  // If running snapshot test, skip phone image surrounding the story and use the screen dimensions specified by the
  // test configuration
  if (process.env.STORYBOOK_LOKI) {
    return (
      <View
        style={{
          backgroundColor,
          width: "100vw",
          height: "100vh",
          display: "flex",
          overflow: "hidden",
          position: "relative"
        }}
      >
        {children}
      </View>
    );
  }

  // If running interactively, scale down to ensure we fit on-screen and render with phone around the story
  return (
    <View style={{ transform: [{ scale: 0.75 }, { translateX: -100 }] }}>
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
