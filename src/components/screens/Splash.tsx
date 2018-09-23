import React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../../style/common";
import { HeadingType } from "../../types";
import Heading from "../atoms/Heading";
import WobblyButton from "../atoms/WobblyButton";
import VerticalButtonGroup from "../molecules/VerticalButtonGroup";

const Splash = () => (
  <View style={style.splash}>
    <Heading level={HeadingType.H1} style={style.splashHeading}>
      Wobbly
    </Heading>
    <VerticalButtonGroup>
      <WobblyButton text="Log in" />
      <WobblyButton text="Sign up" />
      <WobblyButton text="About" />
    </VerticalButtonGroup>
  </View>
);
export default Splash;

const style = StyleSheet.create({
  splash: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.gray,
    justifyContent: "space-around"
  },
  splashHeading: {
    textAlign: "center",
    color: colors.white
  }
});
