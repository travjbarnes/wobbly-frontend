import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/ScreenWrapper";
import { someId, someSequence, someThread } from "../../__stories__/testData";

import ThreadsListScreen from "./ThreadsListScreen";

storiesOf("screens/ThreadsListScreen", module)
  .add(
    "Standard",
    screenStory(ThreadsListScreen, {
      navigationParams: {
        groupId: someId()
      },
      mocks: {
        Query: () => ({
          threads: () => someSequence(3, someThread)
        })
      }
    })
  )
  .add(
    "Empty State",
    screenStory(ThreadsListScreen, {
      navigationParams: {
        groupId: someId()
      },
      mocks: {
        Query: () => ({
          threads: () => []
        })
      }
    })
  );
