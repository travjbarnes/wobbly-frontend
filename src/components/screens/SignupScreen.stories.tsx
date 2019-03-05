import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";

import SignupScreen from "./SignupScreen";

storiesOf("screens/SignupScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(SignupScreen));
