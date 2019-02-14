import moment from "moment";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BubbleProps, utils } from "react-native-gifted-chat";

import { colors } from "../../style/common";

import WobblyText from "./WobblyText";

const { isSameUser, isSameDay } = utils;

export default class PostBubble extends React.PureComponent<BubbleProps> {
  public render() {
    return (
      <View style={style.container}>
        <View style={style.header}>
          {this.renderName()}
          {this.renderTime()}
        </View>
        {this.renderText()}
      </View>
    );
  }
  private renderName = () => {
    const { currentMessage, previousMessage } = this.props;
    if (isSameUser(currentMessage!, previousMessage!) && isSameDay(currentMessage, previousMessage)) {
      return;
    }
    return <Text style={style.name}>{this.props.currentMessage!.user.name}</Text>;
  };

  private renderTime = () => {
    if (!this.props.currentMessage!.createdAt) {
      return;
    }
    const { containerStyle, wrapperStyle, ...timeProps } = this.props;
    if (this.props.renderTime) {
      return this.props.renderTime(timeProps);
    }
    const createdAt = moment(timeProps.currentMessage!.createdAt);
    return (
      <View style={style.timeContainer}>
        <Text style={style.time}>{createdAt.format("HH:mm")}</Text>
      </View>
    );
  };

  private renderText = () => {
    return <WobblyText>{this.props.currentMessage!.text}</WobblyText>;
  };
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  name: {
    fontWeight: "bold",
    fontSize: 12,
    marginRight: 10
  },
  timeContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  time: {
    textAlign: "left",
    fontSize: 12,
    color: colors.gray2
  }
});
