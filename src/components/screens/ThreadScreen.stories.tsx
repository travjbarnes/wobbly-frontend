import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";
import { someId } from "../../__stories__/testData";

import ThreadScreen from "./ThreadScreen";

storiesOf("screens/ThreadScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(ThreadScreen, { threadId: someId(), groupId: someId() }));
