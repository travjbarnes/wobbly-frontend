import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/ScreenWrapper";

import SettingsScreen from "./SettingsScreen";

storiesOf("screens/SettingsScreen", module).add("Standard", screenStory(SettingsScreen));
