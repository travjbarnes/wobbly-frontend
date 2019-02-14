import hoistNonReactStatics from "hoist-non-react-statics";
import { get } from "lodash";
import * as React from "react";
import { NavigationInjectedProps } from "react-navigation";
import HeaderButtons from "react-navigation-header-buttons";

import { getThreads_threads } from "../../generated/getThreads";
import { THREADS_QUERY, ThreadsQuery, ThreadsQueryResult } from "../../graphql/queries";
import { createNavigatorFunction } from "../../util";
import { WobblyHeaderButtons } from "../molecules";
import { LoadingState, ThreadsList } from "../organisms";

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
    }
    // TODO: error state
    // TODO: no threads view
    const threads: getThreads_threads[] = get(result, "data.threads", []);
    return <ThreadsList threads={threads} onPressFactory={this.onPressFactory} />;
  }

  private onPressFactory = (item: getThreads_threads): (() => void) => {
    return createNavigatorFunction("Thread", { threadId: item.id, threadTitle: item.title });
  };
}

const EnhancedComponent = ({ navigation }: NavigationInjectedProps) => (
  <ThreadsQuery query={THREADS_QUERY} variables={{ groupId: navigation.getParam("groupId", "") }}>
    {result => <ThreadsListScreen result={result} navigation={navigation} />}
  </ThreadsQuery>
);

export default hoistNonReactStatics(EnhancedComponent, ThreadsListScreen);
