import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";

import GroupsListScreen from "./GroupsListScreen";

storiesOf("screens/GroupsListScreen", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(GroupsListScreen));
