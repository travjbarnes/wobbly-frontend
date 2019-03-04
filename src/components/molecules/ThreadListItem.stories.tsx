import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenWrapper } from "../../__stories__/ScreenWrapper";
import { someId, someThread } from "../../__stories__/testData";

import { ThreadListItem } from ".";

storiesOf("molecules/ThreadListItem", module)
  .addDecorator(screenWrapper())
  .addDecorator(withMockClient())
  .add("Standard", () => (
    <ThreadListItem groupId={someId(0, "group")} onPress={action("press")} thread={someThread()} />
  ));
