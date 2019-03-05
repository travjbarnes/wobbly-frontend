import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";
import { someId } from "../../__stories__/testData";

import JoinGroupScreen from "./JoinGroupScreen";

storiesOf("screens/JoinGroupScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(JoinGroupScreen, { groupId: someId() }));
