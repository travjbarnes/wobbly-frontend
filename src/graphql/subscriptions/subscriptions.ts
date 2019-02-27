import gql from "graphql-tag";

import { postListDetailsFragment, threadListDetailsFragment } from "../fragments";

export const POST_ADDED_SUBSCRIPTION = gql`
  subscription onPostAdded {
    postAdded {
      ...PostListDetails
      thread {
        id
        group {
          id
        }
      }
    }
  }
  ${postListDetailsFragment}
`;

export const THREAD_ADDED_SUBSCRIPTION = gql`
  subscription onThreadAdded {
    threadAdded {
      ...ThreadListDetails
      group {
        id
      }
    }
  }
  ${threadListDetailsFragment}
`;
