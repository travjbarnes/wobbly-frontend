import { storiesOf } from "@storybook/react";

import { withMockClient } from "../../__stories__/MockClient";
import { screenStory } from "../../__stories__/ScreenWrapper";

import SearchGroupsModal from "./SearchGroupsModal";

storiesOf("screens/SearchGroupsModal", module)
  .addDecorator(withMockClient())
  .add("Standard", screenStory(SearchGroupsModal));
