import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/ScreenWrapper";

import AccountScreen from "./AccountScreen";

storiesOf("screens/AccountScreen", module).add("Standard", screenStory(AccountScreen));
