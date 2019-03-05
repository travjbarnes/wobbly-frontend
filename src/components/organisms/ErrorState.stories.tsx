import { storiesOf } from "@storybook/react";
import React from "react";

import { screenWrapper } from "../../__stories__/ScreenWrapper";

import ErrorState from "./ErrorState";

storiesOf("organisms/ErrorState", module)
  .addDecorator(screenWrapper())
  .add("Standard", () => <ErrorState />);
