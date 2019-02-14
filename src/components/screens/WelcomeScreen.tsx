import * as React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../../style/common";
import { createNavigatorFunction } from "../../util";
import { WobblyButton } from "../atoms";
import WobblyText from "../atoms/WobblyText";
import { VerticalButtonGroup } from "../molecules";

class WelcomeScreen extends React.PureComponent {
  public static navigationOptions = {
    header: null
  };

  public render() {
    return (
      <View style={styles.welcome}>
        <WobblyText h1={true} style={styles.welcomeHeading}>
          Wobbly
        </WobblyText>
        <VerticalButtonGroup>
          <WobblyButton onPress={createNavigatorFunction("Login")}>Log in</WobblyButton>
          <WobblyButton onPress={createNavigatorFunction("Signup")}>Sign up</WobblyButton>
          <WobblyButton>About</WobblyButton>
        </VerticalButtonGroup>
      </View>
    );
  }
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.darkGray1,
    justifyContent: "space-around"
  },
  welcomeHeading: {
    textAlign: "center",
    color: colors.white,
    marginBottom: 10
  }
});
