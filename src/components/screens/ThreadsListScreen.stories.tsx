import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";
import { someId } from "../../__stories__/testData";

import ThreadsListScreen from "./ThreadsListScreen";

storiesOf("screens/ThreadsListScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(ThreadsListScreen, { groupId: someId() }));
