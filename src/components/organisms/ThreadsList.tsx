import * as React from "react";
import { FlatList } from "react-native";

import { getThreads_threads } from "../../generated/getThreads";
import { ThreadListItem } from "../molecules";

interface IThreadsListProps {
  threads: getThreads_threads[];
  groupId: string;
  onPressFactory: (item: getThreads_threads) => () => void;
}

export default class ThreadsList extends React.PureComponent<IThreadsListProps> {
  public render() {
    const { threads } = this.props;
    return <FlatList data={threads} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />;
  }

  private renderItem = ({ item }: { item: getThreads_threads }) => {
    return <ThreadListItem thread={item} groupId={this.props.groupId} onPress={this.props.onPressFactory(item)} />;
  };

  private keyExtractor = (item: getThreads_threads) => item.id;
}
