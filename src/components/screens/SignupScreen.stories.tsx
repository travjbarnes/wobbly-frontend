import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/ScreenWrapper";

import SignupScreen from "./SignupScreen";

storiesOf("screens/SignupScreen", module).add("Standard", screenStory(SignupScreen));
