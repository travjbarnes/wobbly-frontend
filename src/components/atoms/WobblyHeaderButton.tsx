import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { HeaderButton } from "react-navigation-header-buttons";

interface IWobblyHeaderButtonProps {
  title: string;
}

/**
 * https://github.com/vonovak/react-navigation-header-buttons#how-to-integrate-in-your-project
 */
const WobblyHeaderButton: React.SFC<IWobblyHeaderButtonProps> = props => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="black" />
);
export default WobblyHeaderButton;
