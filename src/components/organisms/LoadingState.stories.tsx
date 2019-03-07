import { storiesOf } from "@storybook/react";
import React from "react";

import { screenWrapper } from "../../__stories__/storyWrapper";

import LoadingState from "./LoadingState";

storiesOf("organisms/LoadingState", module)
  .addDecorator(screenWrapper())
  .add("Standard", () => <LoadingState />);
