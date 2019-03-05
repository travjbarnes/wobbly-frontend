import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";

import SplashScreen from "./SplashScreen";

storiesOf("screens/SplashScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(SplashScreen));
