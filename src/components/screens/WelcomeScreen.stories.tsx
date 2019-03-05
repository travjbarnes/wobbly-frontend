import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";

import WelcomeScreen from "./WelcomeScreen";

storiesOf("screens/WelcomeScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(WelcomeScreen));
