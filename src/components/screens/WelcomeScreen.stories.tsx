import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/storyWrapper";

import WelcomeScreen from "./WelcomeScreen";

storiesOf("screens/WelcomeScreen", module).add("Standard", screenStory(WelcomeScreen));
