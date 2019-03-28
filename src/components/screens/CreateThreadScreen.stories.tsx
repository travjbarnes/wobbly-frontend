import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/storyWrapper";

import CreateThreadScreen from "./CreateThreadScreen";

storiesOf("screens/CreateThreadScreen", module).add("Standard", screenStory(CreateThreadScreen));
