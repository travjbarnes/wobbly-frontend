import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { WobblyButton } from "../atoms";
import SearchBar from "../molecules/SearchBar";
import { GroupListItem } from "../organisms";
import Screen from "./Screen";

interface IGroupListItem {
  id: string;
  name: string;
  description: string;
  memberList: number[];
}

interface IGroupsScreenProps {
  groups: IGroupListItem[];
}

/**
 * Dummy Data To Be Replaced By Redux
 * Assuming that groups will want to be iterable
 * and sortable by name/description/location? What else...
 */
const groups: IGroupListItem[] = [
  {
    id: "1",
    name: "Group 1",
    description: "The Very First Group",
    memberList: [1, 2, 3, 4, 5, 6]
  },
  {
    id: "2",
    name: "Group 2",
    description: "The Second Group",
    memberList: [1, 2, 3, 4]
  },
  {
    id: "3",
    name: "Group 3",
    description: "Anotha 1",
    memberList: [1, 2, 3, 4, 5, 9]
  },
  {
    id: "4",
    name: "Group 4",
    description: "Grupo Picante",
    memberList: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    id: "5",
    name: "Group 5",
    description: "Test Group X",
    memberList: [1, 2, 3, 6, 7, 8, 9]
  },
  {
    id: "6",
    name: "Group 6",
    description: "I Am Groop",
    memberList: [1, 7, 8, 9]
  }
];

class GroupScreen extends Component<IGroupsScreenProps, {}> {
  // TODO: Navigate to add group page
  public handlePress = () => {
    return null;
  };

  public render() {
    const { handlePress } = this;
    return (
      <Screen title="Groups">
        <View style={styles.screenWrapper}>
          <SearchBar />
          <ScrollView style={styles.groupWrapper}>
            {groups.map((group: IGroupListItem) => (
              <GroupListItem
                key={group.id}
                name={group.name}
                description={group.description}
                memberList={group.memberList}
              />
            ))}
          </ScrollView>
          <WobblyButton text={"Add A New Group"} onPress={handlePress} />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    width: "100%",
    padding: 20
  },
  groupWrapper: {
    marginTop: 10,
    marginBottom: 10
  }
});

export default GroupScreen;
