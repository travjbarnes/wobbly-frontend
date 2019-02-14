import hoistNonReactStatics from "hoist-non-react-statics";
import { get, reverse, sortBy } from "lodash";
import * as React from "react";
import { NavigationInjectedProps } from "react-navigation";
import HeaderButtons from "react-navigation-header-buttons";

import { getThreads_threads } from "../../generated/getThreads";
import { THREADS_QUERY, ThreadsQuery, ThreadsQueryResult } from "../../graphql/queries";
import { createNavigatorFunction } from "../../util";
import { WobblyHeaderButtons } from "../molecules";
import { ErrorState, LoadingState, ThreadsList } from "../organisms";

interface IThreadsListScreenProps extends NavigationInjectedProps {
  result: ThreadsQueryResult;
}
class ThreadsListScreen extends React.PureComponent<IThreadsListScreenProps> {
  public static navigationOptions = ({ navigation }: NavigationInjectedProps) => {
    const groupId = navigation.getParam("groupId", "");
    const groupName = navigation.getParam("groupName", "");
    const navigateToGroupDetails = createNavigatorFunction("GroupDetails", { groupId, groupName });
    const navigateToCreateThread = createNavigatorFunction("CreateThread", { groupId, groupName });
    return {
      title: groupName,
      headerRight: (
        <WobblyHeaderButtons>
          <HeaderButtons.Item title="Add" iconName="create" onPress={navigateToCreateThread} />
          <HeaderButtons.Item title="Info" iconName="info" onPress={navigateToGroupDetails} />
        </WobblyHeaderButtons>
      )
    };
  };

  public render() {
    const { result } = this.props;
    if (result.loading) {
      return <LoadingState />;
    } else if (result.error) {
      return <ErrorState />;
    }
    const threads: getThreads_threads[] = get(result, "data.threads", []);
    const sortedThreads = reverse(sortBy(threads, thread => new Date(thread.posts[thread.posts.length - 1].createdAt)));
    return <ThreadsList threads={sortedThreads} onPressFactory={this.onPressFactory} />;
  }

  private onPressFactory = (item: getThreads_threads): (() => void) => {
    const groupId = this.props.navigation.getParam("groupId", "");
    return createNavigatorFunction("Thread", { threadId: item.id, threadTitle: item.title, groupId });
  };
}

const EnhancedComponent = ({ navigation }: NavigationInjectedProps) => (
  <ThreadsQuery query={THREADS_QUERY} variables={{ groupId: navigation.getParam("groupId", "") }}>
    {result => <ThreadsListScreen result={result} navigation={navigation} />}
  </ThreadsQuery>
);

export default hoistNonReactStatics(EnhancedComponent, ThreadsListScreen);
