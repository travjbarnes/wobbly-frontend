import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

import { Entypo } from "@expo/vector-icons";

import { colors } from "../../style/common";

export interface IGroupListItemProps {
  name: string;
  description: string;
  memberList: number[];
}

// TODO: Navigate to group page matching id
const onPress = () => {
  return null;
};

const GroupListItem = (props: IGroupListItemProps) => (
  <TouchableHighlight onPress={onPress} underlayColor={colors.lightGray1}>
    <View style={styles.itemWrapper}>
      <View style={styles.placeholderBadge} />
      <View style={styles.groupDetailView}>
        <Text style={styles.groupNameText}>{props.name}</Text>
        <Text style={styles.groupDescriptionText}>{props.description}</Text>
        <Text style={styles.groupMemberCountText}>{props.memberList.length} Members</Text>
      </View>
      <View style={styles.iconContainer}>
        <Entypo name="chevron-right" size={40} />
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  itemWrapper: {
    marginBottom: 5,
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10
  },
  placeholderBadge: {
    width: 60,
    height: 60,
    backgroundColor: "black",
    marginRight: 20
  },
  groupDetailView: {
    justifyContent: "space-between",
    flex: 1
  },
  groupNameText: {
    fontSize: 18,
    lineHeight: 18
  },
  groupDescriptionText: {
    fontSize: 12
  },
  groupMemberCountText: {
    fontSize: 12
  },
  iconContainer: {
    alignSelf: "center"
  }
});

export default GroupListItem;
