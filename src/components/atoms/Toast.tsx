import * as React from "react";
import { Animated, StyleSheet, Text } from "react-native";

class Toast extends React.Component {
  public state = {
    message: "",
    notificationOpacity: new Animated.Value(0)
  };

  public show(message: string) {
    this.setState({
      message
    });
    Animated.timing(this.state.notificationOpacity, {
      toValue: 0.8,
      duration: 500
    }).start(() => {
      // hold and fade out
      Animated.timing(this.state.notificationOpacity, {
        toValue: 0,
        duration: 2000,
        delay: 1000
      }).start();
    });
  }

  public render() {
    return (
      <Animated.View
        style={{
          alignItems: "center",
          top: "50%",
          opacity: this.state.notificationOpacity,
          position: "absolute",
          width: "100%"
        }}
      >
        <Text style={styles.toast}>{this.state.message}</Text>
      </Animated.View>
    );
  }
}

export default Toast;

const styles = StyleSheet.create({
  toast: {
    backgroundColor: "gray",
    borderRadius: 10,
    color: "white",
    paddingHorizontal: 10,
    textAlign: "center",
    minWidth: "50%"
  }
});
