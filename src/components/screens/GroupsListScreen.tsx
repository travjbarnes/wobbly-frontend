import hoistNonReactStatics from "hoist-non-react-statics";
import * as React from "react";
import HeaderButtons from "react-navigation-header-buttons";

import { GROUPS_QUERY, GroupsQuery, GroupsQueryResult } from "../../graphql/queries";
import { createNavigatorFunction } from "../../util";
import { WobblyHeaderButtons } from "../molecules";
import { LoadingState, NodesList } from "../organisms";

interface IGroupsListScreenProps {
  result: GroupsQueryResult;
}

class GroupsListScreen extends React.PureComponent<IGroupsListScreenProps> {
  public static navigationOptions = () => {
    const navigateToSearchGroups = createNavigatorFunction("SearchGroups");
    return {
      title: "Groups",
      headerRight: (
        <WobblyHeaderButtons>
          <HeaderButtons.Item title="Add" iconName="search" onPress={navigateToSearchGroups} />
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

    const groups = result.data && result.data.groups;
    if (groups) {
      return <NodesList nodes={groups} onPressFactory={this.onPressFactory} />;
    }

    // TODO: empty view encouraging people to join/create a group
    return null;
  }

  private onPressFactory = (item: any): (() => void) => {
    return createNavigatorFunction("ThreadsList", { groupId: item.id, groupName: item.name });
  };
}

const EnhancedComponent = () => (
  <GroupsQuery query={GROUPS_QUERY}>{result => <GroupsListScreen result={result} />}</GroupsQuery>
);
export default hoistNonReactStatics(EnhancedComponent, GroupsListScreen);
