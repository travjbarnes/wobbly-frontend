import { omit, remove } from "lodash";
import * as React from "react";
import { OnSubscriptionDataOptions } from "react-apollo";

import { getPosts } from "./generated/getPosts";
import { getThreads, getThreads_threads } from "./generated/getThreads";
import { onPostAdded } from "./generated/onPostAdded";
import { onThreadAdded } from "./generated/onThreadAdded";
import { OwnInfoQueryResult, POSTS_QUERY, THREADS_QUERY } from "./graphql/queries";
import { POST_ADDED_SUBSCRIPTION, THREAD_ADDED_SUBSCRIPTION } from "./graphql/subscriptions/subscriptions";
import { PostAddedSubscription, ThreadAddedSubscription } from "./graphql/subscriptions/types";

interface IAppWithSubscriptionsProps {
  children: React.ReactNode;
  ownInfoResult: OwnInfoQueryResult;
}
/**
 * This component wraps the entire app and adds subscriptions.
 * We add subscriptions for new posts and threads here rather than in the individual screens. That way, new data
 * comes in regardless of where the user navigates. Otherwise they'd unsubscribe when navigating away from e.g. a
 * `ThreadScreen`.
 */
export default class AppWithSubscriptions extends React.PureComponent<IAppWithSubscriptionsProps> {
  public render() {
    const { ownInfoResult } = this.props;
    let personId = "";

    if (!ownInfoResult.loading && !ownInfoResult.error && ownInfoResult.data) {
      personId = (ownInfoResult.data.me && ownInfoResult.data.me.id) || "";
    }

    // If there's no personId, we are presumably logged out and should not
    // subscribe to anything.
    if (!!personId) {
      return (
        <PostAddedSubscription
          subscription={POST_ADDED_SUBSCRIPTION}
          onSubscriptionData={this.updateCacheWithPost}
          shouldResubscribe={this.shouldResubscribe}
        >
          {() => (
            <ThreadAddedSubscription
              subscription={THREAD_ADDED_SUBSCRIPTION}
              onSubscriptionData={this.updateCacheWithThread}
              shouldResubscribe={this.shouldResubscribe}
            >
              {() => this.props.children}
            </ThreadAddedSubscription>
          )}
        </PostAddedSubscription>
      );
    } else {
      return this.props.children;
    }
  }

  private shouldResubscribe = () => {
    // Only resubscribe if we have a personId (i.e. we are logged in)
    const { data } = this.props.ownInfoResult;
    return data && data.me && !!data.me.id;
  };

  private updateCacheWithThread = ({ client, subscriptionData }: OnSubscriptionDataOptions<onThreadAdded>) => {
    if (!subscriptionData.data || subscriptionData.error) {
      return;
    }

    const { threadAdded } = subscriptionData.data;
    const groupId = threadAdded.group.id;
    let prevThreads;
    try {
      prevThreads = client.readQuery<getThreads>({ query: THREADS_QUERY, variables: { groupId } });
    } catch {
      prevThreads = null;
    }
    if (prevThreads !== null) {
      const updatedThreads = prevThreads.threads
        .filter(t => t.id !== threadAdded.id)
        .concat([omit(threadAdded, "group")]);
      client.writeQuery({
        query: THREADS_QUERY,
        variables: { groupId },
        data: {
          threads: updatedThreads
        }
      });
    }
  };

  private updateCacheWithPost = ({ client, subscriptionData }: OnSubscriptionDataOptions<onPostAdded>) => {
    if (!subscriptionData.data || subscriptionData.error) {
      // TODO: do something like this everywhere we update the cache?
      return;
    }
    const { postAdded } = subscriptionData.data;
    const threadId = postAdded.thread.id;
    const groupId = postAdded.thread.group.id;
    // In the subscription, we also get the group ID that the post is in. This is so we can update the cache correctly.
    // However, other queries/mutations don't need this group ID, so we filter down the subscription response to just
    // the fields stored in the cache.
    let prevPosts;
    try {
      // This will throw an error if the query isn't already in the cache with the given threadId
      prevPosts = client.readQuery<getPosts>({ query: POSTS_QUERY, variables: { threadId } });
    } catch {
      prevPosts = null;
    }
    // If the thread isn't already in the cache, we don't want to update it. In that case we'll only update the
    // list of threads w/ their most recent post below.
    if (prevPosts !== null) {
      const updatedPosts = [omit(postAdded, "thread")].concat(prevPosts.posts);
      client.writeQuery({
        query: POSTS_QUERY,
        variables: {
          threadId
        },
        data: {
          posts: updatedPosts
        }
      });
    }

    // Also update the query for threads so we can sort them by recent activity and show the most recent post
    let prevThreads;
    try {
      prevThreads = client.readQuery<getThreads>({ query: THREADS_QUERY, variables: { groupId } })!.threads!;
    } catch {
      prevThreads = null;
    }
    if (prevThreads !== null) {
      const thisThread = remove(prevThreads, (thread: getThreads_threads) => thread.id === threadId)[0];
      const updatedThreads = prevThreads.concat([{ ...thisThread, posts: [omit(postAdded, "thread")] }]);
      client.writeQuery({
        query: THREADS_QUERY,
        variables: {
          groupId
        },
        data: {
          threads: updatedThreads
        }
      });
    }
  };
}
