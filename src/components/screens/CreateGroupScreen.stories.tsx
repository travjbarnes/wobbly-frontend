import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/storyWrapper";

import CreateGroupScreen from "./CreateGroupScreen";

storiesOf("screens/CreateGroupScreen", module).add("Standard", screenStory(CreateGroupScreen));
