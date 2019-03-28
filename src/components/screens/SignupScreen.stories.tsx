import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/storyWrapper";

import SignupScreen from "./SignupScreen";

storiesOf("screens/SignupScreen", module).add("Standard", screenStory(SignupScreen));
