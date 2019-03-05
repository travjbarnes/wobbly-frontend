import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";

import AccountScreen from "./AccountScreen";

storiesOf("screens/AccountScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(AccountScreen));
