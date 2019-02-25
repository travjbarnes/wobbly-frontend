import gql from "graphql-tag";

export const threadListDetails = gql`
  fragment ThreadListDetails on Thread {
    id
    title
    pinned
    posts(last: 1) {
      id
      content
      createdAt
      author {
        id
        name
      }
    }
  }
`;
