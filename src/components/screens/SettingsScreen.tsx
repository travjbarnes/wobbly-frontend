import * as React from "react";
import { ScrollView } from "react-native";

import { UpdateSettingsForm } from "../organisms";

class SettingsScreen extends React.Component {
  public static navigationOptions = () => {
    return {
      title: "Account"
    };
  };

  public render() {
    return (
      <ScrollView>
        <UpdateSettingsForm />
      </ScrollView>
    );
  }
}

export default SettingsScreen;
