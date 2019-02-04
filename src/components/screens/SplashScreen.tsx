import * as React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";

import { IApplicationState } from "../../store";
import { standardColors } from "../../style/common";

interface ISplashScreenProps extends Partial<NavigationInjectedProps> {
  token?: string;
}

/**
 * This screen is displayed in two situations, but always immediately after one another:
 * (1) First, redux-persist loads the state from disk and shows this splash screen.
 * (2) Then, react-navigation opens it as the default screen but immediately redirects to the Auth or App stack,
 * depending on whether the user is authenticated or not.
 */
class SplashScreen extends React.PureComponent<ISplashScreenProps> {
  public componentDidMount() {
    // We use `componentDidMount()` rather than `componentDidUpdate()` because, when moving from case (1) to case (2)
    // described above, the splash screen is unmounted and then remounted (rather than just updated).

    const { token, navigation } = this.props;
    if (!navigation) {
      // If navigation isn't loaded, we are in the first case described above. Don't check auth yet.
      return;
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // https://reactnavigation.org/docs/en/auth-flow.html
    navigation.navigate(token ? "App" : "Auth");
  }

  public render() {
    return (
      <SafeAreaView style={style.wrapper}>
        <Text style={style.text}>Wobbly</Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: IApplicationState): Partial<ISplashScreenProps> => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(SplashScreen);

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: standardColors.primaryButtonBackground
  },
  text: {
    color: standardColors.primaryText
  }
});
