import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/storyWrapper";

import SettingsScreen from "./SettingsScreen";

storiesOf("screens/SettingsScreen", module).add("Standard", screenStory(SettingsScreen));
