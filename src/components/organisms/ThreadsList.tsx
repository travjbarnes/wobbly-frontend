import * as React from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";

import { getThreads_threads } from "../../generated/getThreads";

interface IThreadsListProps {
  threads: getThreads_threads[];
  onPressFactory: (item: getThreads_threads) => () => void;
}

class ThreadsList extends React.PureComponent<IThreadsListProps> {
  public render() {
    const { threads } = this.props;
    return <FlatList data={threads} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />;
  }

  private renderItem = ({ item }: { item: getThreads_threads }) => {
    const onPress = this.props.onPressFactory(item);
    const mostRecentPost = item.posts[0].content;
    const mostRecentAuthor = item.posts[0].author.name;
    return (
      <ListItem
        title={item.title}
        subtitle={`${mostRecentAuthor}: ${mostRecentPost}`}
        onPress={onPress}
        bottomDivider={true}
        subtitleProps={{ numberOfLines: 1, ellipsizeMode: "tail" }}
        rightIcon={{ name: "chevron-right" }}
      />
    );
  };

  private keyExtractor = (item: getThreads_threads) => item.id;
}

export default ThreadsList;
