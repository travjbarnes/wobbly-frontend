import * as React from "react";
import { ScrollView } from "react-native";

import { ResetPassword, SendResetCode } from "../organisms";

class SettingsScreen extends React.Component {
  public static navigationOptions = () => {
    return {
      title: "Account"
    };
  };

  public render() {
    return (
      <ScrollView>
        <SendResetCode />
        <ResetPassword />
      </ScrollView>
    );
  }
}

export default SettingsScreen;
