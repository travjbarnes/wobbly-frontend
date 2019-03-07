import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/ScreenWrapper";

import SearchGroupsModal from "./SearchGroupsModal";

storiesOf("screens/SearchGroupsModal", module).add("Standard", screenStory(SearchGroupsModal));
