import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/ScreenWrapper";
import { someId } from "../../__stories__/testData";

import GroupDetailsScreen from "./GroupDetailsScreen";

storiesOf("screens/GroupDetailsScreen", module).add(
  "Standard",
  screenStory(GroupDetailsScreen, { navigationParams: { groupId: someId() } })
);
