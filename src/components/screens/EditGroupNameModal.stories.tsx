import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";
import { someId } from "../../__stories__/testData";

import EditGroupNameModal from "./EditGroupNameModal";

storiesOf("screens/EditGroupNameModal", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(EditGroupNameModal, { groupId: someId() }));
