import * as React from "react";
import { View } from "react-native";

interface IVerticalButtonGroupProps {
  children: JSX.Element | JSX.Element[];
}
const VerticalButtonGroup = ({ children }: IVerticalButtonGroupProps) => <View>{children}</View>;
export default VerticalButtonGroup;
