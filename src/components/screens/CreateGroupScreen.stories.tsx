import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";

import CreateGroupScreen from "./CreateGroupScreen";

storiesOf("screens/CreateGroupScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(CreateGroupScreen));
