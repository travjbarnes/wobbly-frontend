import { StoryDecorator } from "@storybook/react";
import React from "react";
import { FlexStyle, View } from "react-native";

export interface IScreenWrapperProps {
  backgroundColor?: string;
  justify?: FlexStyle["justifyContent"];
  align?: FlexStyle["alignItems"];
}

export function screenWrapper({
  justify = "center",
  align = "center",
  backgroundColor = "steelblue"
}: IScreenWrapperProps = {}): StoryDecorator {
  return children => (
    <View style={{ transform: [{ scale: 0.8 }] }}>
      <img style={{ position: "absolute" }} src={require("./phone.svg")} />
      <View
        style={{
          backgroundColor,
          display: "flex",
          alignItems: align,
          justifyContent: justify,
          position: "absolute",
          overflow: "hidden",
          left: 29,
          top: 109,
          height: 689,
          width: 390
        }}
      >
        {children()}
      </View>
    </View>
  );
}
