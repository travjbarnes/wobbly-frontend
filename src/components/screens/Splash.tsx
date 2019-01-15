import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { standardColors } from "../../style/common";

const Splash: React.SFC<{}> = () => (
  <View style={style.wrapper}>
    <Text style={style.text}>Wobbly</Text>
  </View>
);
const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: standardColors.primaryButtonBackground
  },
  text: {
    textAlign: "center",
    color: standardColors.primaryText
  }
});
export default Splash;
