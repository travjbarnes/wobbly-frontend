import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/ScreenWrapper";
import { someId } from "../../__stories__/testData";

import ThreadScreen from "./ThreadScreen";

storiesOf("screens/ThreadScreen", module).add(
  "Standard",
  screenStory(ThreadScreen, { navigationParams: { threadId: someId(), groupId: someId() } })
);
