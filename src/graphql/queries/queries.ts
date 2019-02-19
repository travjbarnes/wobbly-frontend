import gql from "graphql-tag";

export const OWN_INFO_QUERY = gql`
  query getOwnInfo {
    me {
      id
      name
      email
    }
  }
`;

export const GROUPS_QUERY = gql`
  query getGroups {
    groups {
      id
      name
      memberCount
    }
  }
`;

export const SEARCH_GROUPS_QUERY = gql`
  query searchGroups($searchQuery: String!) {
    searchGroups(searchQuery: $searchQuery) {
      id
      name
      description
    }
  }
`;

export const PUBLIC_GROUP_DETAILS_QUERY = gql`
  query getPublicGroupDetails($groupId: ID!) {
    group(id: $groupId) {
      id
      name
      description
    }
  }
`;

export const GROUP_DETAILS_QUERY = gql`
  query getGroupDetails($groupId: ID!) {
    group(id: $groupId) {
      id
      name
      description
      members {
        id
        name
      }
    }
  }
`;

export const THREADS_QUERY = gql`
  query getThreads($groupId: ID!) {
    threads(groupId: $groupId) {
      id
      title
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
  }
`;

export const POSTS_QUERY = gql`
  query getPosts($threadId: ID!) {
    posts(threadId: $threadId) {
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
