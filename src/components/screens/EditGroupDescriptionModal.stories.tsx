import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/storyWrapper";
import { someId } from "../../__stories__/testData";

import EditGroupDescriptionModal from "./EditGroupDescriptionModal";

storiesOf("screens/EditGroupDescriptionModal", module).add(
  "Standard",
  screenStory(EditGroupDescriptionModal, { navigationParams: { groupId: someId() } })
);
