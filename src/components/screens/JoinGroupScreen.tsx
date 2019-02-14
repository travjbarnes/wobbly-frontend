import hoistNonReactStatics from "hoist-non-react-statics";
import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationInjectedProps } from "react-navigation";

import { getGroups } from "../../generated/getGroups";
import {
  JOIN_GROUP_MUTATION,
  JoinGroupMutation,
  JoinGroupMutationFn,
  JoinGroupMutationResult,
  JoinGroupMutationUpdaterFn
} from "../../graphql/mutations";
import { GROUPS_QUERY } from "../../graphql/queries";
import { NavigationService } from "../../services";
import { WobblyButton } from "../atoms";

interface IJoinGroupScreenProps extends NavigationInjectedProps {
  joinGroup: JoinGroupMutationFn;
  result: JoinGroupMutationResult;
}
class JoinGroupScreen extends React.PureComponent<IJoinGroupScreenProps> {
  public static navigationOptions = ({ navigation }: NavigationInjectedProps) => {
    return {
      title: navigation.getParam("groupName", "Unknown group")
    };
  };

  private groupId: string;
  private groupName: string;

  public constructor(props: IJoinGroupScreenProps) {
    super(props);
    this.groupId = props.navigation.getParam("groupId", "");
    this.groupName = props.navigation.getParam("groupName", "");
  }

  public render() {
    const { result } = this.props;
    return (
      <View style={style.container}>
        <WobblyButton disabled={result.loading} onPress={this.handleJoinGroup}>
          {result.loading ? <ActivityIndicator /> : "Join this group"}
        </WobblyButton>
      </View>
    );
  }

  private handleJoinGroup = () => {
    this.props.joinGroup({ variables: { groupId: this.groupId } }).then(() => {
      NavigationService.navigate("ThreadsList", { groupName: this.groupName, groupId: this.groupId });
    });
  };
}

const updateCache: JoinGroupMutationUpdaterFn = (cache, { data }) => {
  const oldData = cache.readQuery<getGroups>({ query: GROUPS_QUERY });
  cache.writeQuery({
    query: GROUPS_QUERY,
    data: {
      groups: (oldData!.groups || []).concat(data!.joinGroup)
    }
  });
};
const EnhancedComponent = ({ navigation }: NavigationInjectedProps) => (
  <JoinGroupMutation mutation={JOIN_GROUP_MUTATION} update={updateCache}>
    {(joinGroup, result) => <JoinGroupScreen joinGroup={joinGroup} result={result} navigation={navigation} />}
  </JoinGroupMutation>
);
export default hoistNonReactStatics(EnhancedComponent, JoinGroupScreen);

const style = StyleSheet.create({
  container: {
    flex: 1
  }
});
