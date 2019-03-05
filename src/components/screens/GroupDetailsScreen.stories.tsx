import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";
import { someId } from "../../__stories__/testData";

import GroupDetailsScreen from "./GroupDetailsScreen";

storiesOf("screens/GroupDetailsScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(GroupDetailsScreen, { groupId: someId() }));
