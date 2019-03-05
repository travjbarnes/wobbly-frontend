import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { screenWrapper } from "../../__stories__/ScreenWrapper";
import { someGroup, someSequence } from "../../__stories__/testData";
import { actionFactory } from "../../__stories__/util";

import GroupsList from "./GroupsList";

storiesOf("organisms/GroupsList", module)
  .addDecorator(screenWrapper())
  .add("Standard", () => (
    <GroupsList
      groups={someSequence(3, someGroup)}
      onPressFactory={actionFactory("press")}
      onEndReached={action("endReached")}
    />
  ))
  .add("Refreshing", () => (
    <GroupsList
      refreshing={true}
      groups={someSequence(3, someGroup)}
      onPressFactory={actionFactory("press")}
      onEndReached={action("endReached")}
    />
  ));
