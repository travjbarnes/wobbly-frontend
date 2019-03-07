import { storiesOf } from "@storybook/react";
import React from "react";

import { screenWrapper } from "../../__stories__/storyWrapper";
import { WobblyButton } from "../atoms";

import { VerticalButtonGroup } from ".";

storiesOf("molecules/VerticalButtonGroup", module)
  .addDecorator(screenWrapper())
  .add("Standard", () => (
    <VerticalButtonGroup>
      <WobblyButton text="Click Me" />
      <WobblyButton text="Click Me First!" />
    </VerticalButtonGroup>
  ));
