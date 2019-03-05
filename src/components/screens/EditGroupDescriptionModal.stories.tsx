import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";
import { someId } from "../../__stories__/testData";

import EditGroupDescriptionModal from "./EditGroupDescriptionModal";

storiesOf("screens/EditGroupDescriptionModal", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(EditGroupDescriptionModal, { groupId: someId() }));
