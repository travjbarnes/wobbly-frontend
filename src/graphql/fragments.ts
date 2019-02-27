import gql from "graphql-tag";

export const postListDetailsFragment = gql`
  fragment PostListDetails on Post {
    __typename
    id
    content
    createdAt
    author {
      __typename
      id
      name
    }
  }
`;

export const threadListDetailsFragment = gql`
  fragment ThreadListDetails on Thread {
    __typename
    id
    title
    pinned
    posts(last: 1) {
      __typename
      id
      content
      createdAt
      author {
        __typename
        id
        name
      }
    }
  }
`;
