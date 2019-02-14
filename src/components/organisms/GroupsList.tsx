import { inflect } from "inflection";
import * as React from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";

import { getGroups_groups } from "../../generated/getGroups";
import { searchGroups_searchGroups } from "../../generated/searchGroups";

interface IGroupsListProps {
  groups: getGroups_groups[] | searchGroups_searchGroups[];
  onPressFactory: (item: getGroups_groups) => () => void;
  refreshing?: boolean;
  onEndReached?: () => void;
}
const GroupsList: React.FC<IGroupsListProps> = ({ groups, onPressFactory, refreshing, onEndReached }) => {
  const renderItem = ({ item }: { item: getGroups_groups }) => {
    const onPress = onPressFactory(item);
    return (
      <ListItem
        title={item.name}
        subtitle={`${item.memberCount} ${inflect("member", item.memberCount!)}`}
        onPress={onPress}
        leftAvatar={{ rounded: true, icon: { name: "home" } }}
        rightIcon={{ name: "chevron-right" }}
        bottomDivider={true}
      />
    );
  };
  return (
    <FlatList
      data={groups}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
    />
  );
};
export default GroupsList;

const keyExtractor = (group: getGroups_groups) => group.id!;
