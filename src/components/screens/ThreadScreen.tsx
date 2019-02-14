import hoistNonReactStatics from "hoist-non-react-statics";
import * as React from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { GiftedChat, IMessage, MessageProps } from "react-native-gifted-chat";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { NavigationInjectedProps } from "react-navigation";

import { getPosts, getPosts_posts } from "../../generated/getPosts";
import {
  CREATE_POST_MUTATION,
  CreatePostMutation,
  CreatePostMutationFn,
  CreatePostMutationResult,
  CreatePostMutationUpdaterFn
} from "../../graphql/mutations";
import {
  OWN_INFO_QUERY,
  OwnInfoQuery,
  OwnInfoQueryResult,
  POSTS_QUERY,
  PostsQuery,
  PostsQueryResult
} from "../../graphql/queries";
import { Post } from "../molecules";
import { LoadingState } from "../organisms";

interface IThreadScreenProps extends NavigationInjectedProps {
  postsResult: PostsQueryResult;
  ownInfoResult: OwnInfoQueryResult;
  createPost: CreatePostMutationFn;
  mutationResult: CreatePostMutationResult;
}
class ThreadScreen extends React.PureComponent<IThreadScreenProps> {
  public static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    title: navigation.getParam("threadTitle", "Thread")
  });

  private static mapToGiftedChatMessages = (posts: getPosts_posts[]): IMessage[] => {
    return posts.map(post => ({
      _id: post.id,
      text: post.content,
      createdAt: post.createdAt,
      user: {
        _id: post.author.id,
        name: post.author.name
      }
    }));
  };

  public render() {
    const { ownInfoResult, postsResult } = this.props;
    if (ownInfoResult.loading || postsResult.loading) {
      return <LoadingState />;
    }
    // TODO: error state
    const posts = (postsResult.data && postsResult.data!.posts) || [];
    const person = ownInfoResult.data && ownInfoResult.data.me;
    if (!person) {
      throw new Error("Attempted to initialize chat screen without the current account info");
    }
    return (
      <SafeAreaView style={style.container}>
        <GiftedChat
          messages={ThreadScreen.mapToGiftedChatMessages(posts)}
          onSend={this.handleSend}
          isAnimated={true}
          user={{ _id: person.id, name: person.name }}
          showAvatarForEveryMessage={true}
          renderMessage={this.renderMessage}
        />
        {Platform.OS === "android" ? <KeyboardSpacer /> : null}
      </SafeAreaView>
    );
  }

  private renderMessage = (props: MessageProps<IMessage>) => <Post {...props} />;

  private handleSend = (messages: IMessage[]) => {
    messages.forEach(msg => {
      this.props.createPost({
        variables: { threadId: this.props.navigation.getParam("threadId", ""), content: msg.text }
      });
    });
  };
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
});

const updateCache: CreatePostMutationUpdaterFn = (cache, { data }) => {
  const threadId = data && data.createPost.thread.id;
  const oldData = cache.readQuery<getPosts>({ query: POSTS_QUERY, variables: { threadId } });
  cache.writeQuery({
    query: POSTS_QUERY,
    variables: {
      threadId
    },
    data: {
      posts: [data!.createPost].concat(oldData!.posts)
    }
  });
};

const EnhancedComponent = ({ navigation }: NavigationInjectedProps) => (
  <OwnInfoQuery query={OWN_INFO_QUERY}>
    {ownInfoResult => (
      <PostsQuery query={POSTS_QUERY} variables={{ threadId: navigation.getParam("threadId", "") }}>
        {postsResult => (
          <CreatePostMutation mutation={CREATE_POST_MUTATION} update={updateCache}>
            {(createPost, mutationResult) => (
              <ThreadScreen
                ownInfoResult={ownInfoResult}
                postsResult={postsResult}
                createPost={createPost}
                mutationResult={mutationResult}
                navigation={navigation}
              />
            )}
          </CreatePostMutation>
        )}
      </PostsQuery>
    )}
  </OwnInfoQuery>
);

export default hoistNonReactStatics(EnhancedComponent, ThreadScreen);
