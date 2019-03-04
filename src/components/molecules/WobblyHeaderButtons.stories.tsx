import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import HeaderButtons from "react-navigation-header-buttons";

import { screenWrapper } from "../../__stories__/ScreenWrapper";

import { WobblyHeaderButtons } from ".";

storiesOf("molecules/WobblyHeaderButtons", module)
  .addDecorator(
    screenWrapper({
      navigationOptions: {
        title: "My Screen",

        headerRight: (
          <WobblyHeaderButtons>
            <HeaderButtons.Item iconName="settings" onPress={action("press")} title="Settings" />
          </WobblyHeaderButtons>
        )
      }
    })
  )
  .add("Standard", () => <View />);
