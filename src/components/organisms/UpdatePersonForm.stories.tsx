import { storiesOf } from "@storybook/react";
import React from "react";

import { screenWrapper } from "../../__stories__/storyWrapper";

import UpdatePersonForm from "./UpdatePersonForm";

storiesOf("organisms/UpdatePersonForm", module)
  .addDecorator(screenWrapper())
  .add("Standard", () => <UpdatePersonForm />);
