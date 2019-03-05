import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";

import CreateThreadScreen from "./CreateThreadScreen";

storiesOf("screens/CreateThreadScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(CreateThreadScreen));
