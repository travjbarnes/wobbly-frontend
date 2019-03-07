import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/ScreenWrapper";
import { someId } from "../../__stories__/testData";

import EditGroupNameModal from "./EditGroupNameModal";

storiesOf("screens/EditGroupNameModal", module).add(
  "Standard",
  screenStory(EditGroupNameModal, { navigationParams: { groupId: someId() } })
);
