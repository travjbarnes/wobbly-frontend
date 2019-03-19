import * as React from "react";
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from "react-native";

import { colors } from "../../style/common";
import WobblyText from "../atoms/WobblyText";

interface IGroupImageProps {
  onPress: () => void;
  image?: ImageSourcePropType;
}
const GroupImage: React.FC<IGroupImageProps> = ({ onPress, image }) => (
  <TouchableOpacity onPress={onPress} style={style.container} activeOpacity={0.8}>
    {(image && <Image source={image} style={style.image} />) || <WobblyText>Tap to set a group image</WobblyText>}
  </TouchableOpacity>
);
export default GroupImage;

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray1,
    height: 200,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    resizeMode: "cover",
    height: 200,
    width: "100%",
    borderRadius: 10
  }
});
