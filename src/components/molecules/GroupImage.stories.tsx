import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { screenWrapper } from "../../__stories__/storyWrapper";
import { someImage } from "../../__stories__/testData";

import { GroupImage } from ".";

storiesOf("molecules/GroupImage", module)
  .addDecorator(screenWrapper())
  .add("Without image", () => <GroupImage onPress={action("press")} />)
  .add("With image", () => <GroupImage image={someImage()} onPress={action("press")} />);
