import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";

import SettingsScreen from "./SettingsScreen";

storiesOf("screens/SettingsScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(SettingsScreen));
