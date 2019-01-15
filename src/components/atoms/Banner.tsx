import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../style/common";

interface IBannerProps {
  text: string;
}
/** A warning banner that hangs at top of a screen. Used to inform the user that e.g. there's no network connection. */
const Banner: React.SFC<IBannerProps> = ({ text }) => (
  // TODO: make it hover above content
  <View style={style.banner}>
    <Text style={style.bannerText}>
      <FontAwesome style={style.bannerIcon} name="warning" size={20} />
      {text}
    </Text>
  </View>
);

const style = StyleSheet.create({
  banner: {
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    zIndex: 2,
    backgroundColor: colors.red3
  },
  bannerText: {
    color: colors.white,
    marginHorizontal: 5,
    textAlign: "center",
    textAlignVertical: "center"
  },
  bannerIcon: {
    marginRight: 10
  }
});
export default Banner;
