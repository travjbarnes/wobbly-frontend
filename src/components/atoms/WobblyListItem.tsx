import React from "react";
import { TouchableHighlight, TouchableHighlightProps, View } from "react-native";
import { ListItem, ListItemProps } from "react-native-elements";

export const WobblyListItem = (props: ListItemProps) => <ListItem Component={SafeTouchableHighlight} {...props} />;

// Ordinary TouchableHighlight throws an exception in web environment due to react-native-elements
// giving it a non-native child. Wrap children in a view to work around this.
const SafeTouchableHighlight = ({ children, ...props }: TouchableHighlightProps & { children?: React.ReactNode }) => (
  <TouchableHighlight {...props}>
    <View>{children}</View>
  </TouchableHighlight>
);
