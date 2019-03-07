import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/ScreenWrapper";

import CreateGroupScreen from "./CreateGroupScreen";

storiesOf("screens/CreateGroupScreen", module).add("Standard", screenStory(CreateGroupScreen));
