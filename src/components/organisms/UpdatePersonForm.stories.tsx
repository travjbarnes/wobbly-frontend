import { storiesOf } from "@storybook/react";
import React from "react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenWrapper } from "../../__stories__/ScreenWrapper";

import UpdatePersonForm from "./UpdatePersonForm";

storiesOf("organisms/UpdatePersonForm", module)
  .addDecorator(withMockClient())
  .addDecorator(screenWrapper())
  .add("Standard", () => <UpdatePersonForm />);
