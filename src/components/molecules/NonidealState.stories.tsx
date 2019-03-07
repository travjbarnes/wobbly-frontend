import { MaterialIcons } from "@expo/vector-icons";
import { storiesOf } from "@storybook/react";
import React from "react";

import { screenWrapper } from "../../__stories__/storyWrapper";

import { NonIdealState } from ".";

storiesOf("molecules/NonidealState", module)
  .addDecorator(screenWrapper({ backgroundColor: "black" }))
  .add("Error", () => (
    <NonIdealState
      title="An error occurred"
      subtitle="This is pretty nonideal, tbh"
      IconFamily={MaterialIcons}
      iconName="error-outline"
    />
  ));
