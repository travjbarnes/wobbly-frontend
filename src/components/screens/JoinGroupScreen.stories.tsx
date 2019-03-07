import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/ScreenWrapper";
import { someGroup, someId } from "../../__stories__/testData";

import JoinGroupScreen from "./JoinGroupScreen";

storiesOf("screens/JoinGroupScreen", module).add(
  "Standard",
  screenStory(JoinGroupScreen, { navigationParams: { groupId: someId(), groupName: someGroup().name } })
);
