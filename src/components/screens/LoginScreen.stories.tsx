import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/storyWrapper";
import { someId } from "../../__stories__/testData";

import LoginScreen from "./LoginScreen";

storiesOf("screens/LoginScreen", module).add(
  "Standard",
  screenStory(LoginScreen, { navigationParams: { groupId: someId() } })
);
