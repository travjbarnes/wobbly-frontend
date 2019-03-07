import { storiesOf } from "@storybook/react";

import { screenStory } from "../../__stories__/storyWrapper";

import SplashScreen from "./SplashScreen";

storiesOf("screens/SplashScreen", module).add("Standard", screenStory(SplashScreen));
