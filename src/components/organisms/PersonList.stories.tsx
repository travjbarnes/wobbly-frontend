import { storiesOf } from "@storybook/react";
import React from "react";

import { screenWrapper } from "../../__stories__/storyWrapper";
import { somePerson, someSequence } from "../../__stories__/testData";

import PersonList from "./PersonList";

storiesOf("organisms/PersonList", module)
  .addDecorator(screenWrapper())
  .add("Standard", () => <PersonList people={someSequence(6, somePerson)} />);
