import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { screenWrapper } from "../../__stories__/ScreenWrapper";

import { SearchBar } from ".";

storiesOf("molecules/SearchBar", module)
  .addDecorator(screenWrapper())
  .add("Standard", () => <SearchBar onSubmit={action("submit")} />);
