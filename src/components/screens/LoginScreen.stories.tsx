import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";
import { someId } from "../../__stories__/testData";

import LoginScreen from "./LoginScreen";

storiesOf("screens/LoginScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(LoginScreen, { groupId: someId() }));
