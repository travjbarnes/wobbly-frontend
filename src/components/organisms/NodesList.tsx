import * as React from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";

import { IGroup } from "../../types";

interface INodesListProps {
  nodes: IGroup[];
  onPressFactory: (item: IGroup) => () => void;
  refreshing?: boolean;
  onEndReached?: () => void;
}
const NodesList: React.FC<INodesListProps> = ({ nodes, onPressFactory, refreshing, onEndReached }) => {
  const renderItem = ({ item }: { item: IGroup }) => {
    const onPress = onPressFactory(item);
    return (
      <ListItem
        title={item.name}
        subtitle="N members"
        onPress={onPress}
        leftAvatar={{ rounded: true, icon: { name: "home" } }}
        rightIcon={{ name: "chevron-right" }}
        bottomDivider={true}
      />
    );
  };
  return (
    <FlatList
      data={nodes}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
    />
  );
};
export default NodesList;

const keyExtractor = (node: IGroup) => node.id!;
