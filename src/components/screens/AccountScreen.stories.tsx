import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/storyWrapper";

import AccountScreen from "./AccountScreen";

storiesOf("screens/AccountScreen", module).add("Standard", screenStory(AccountScreen));
