import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { screenWrapper } from "../../__stories__/storyWrapper";

import { CreateGroupFooter } from ".";

storiesOf("molecules/CreateGroupFooter", module)
  .addDecorator(screenWrapper())
  .add("Standard", () => <CreateGroupFooter onButtonPress={action("press")} />);
