import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/ScreenWrapper";
import { someGroup, someSequence } from "../../__stories__/testData";

import GroupsListScreen from "./GroupsListScreen";

storiesOf("screens/GroupsListScreen", module)
  .add(
    "Standard",
    screenStory(GroupsListScreen, {
      mocks: {
        Query: () => ({
          groups: () => someSequence(3, someGroup)
        })
      }
    })
  )
  .add(
    "Empty State",
    screenStory(GroupsListScreen, {
      mocks: {
        Query: () => ({
          groups: () => []
        })
      }
    })
  );
