import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

export const UPDATE_PERSON_MUTATION = gql`
  mutation updatePerson($email: String, $password: String, $name: String) {
    updatePerson(email: $email, password: $password, name: $name) {
      name
      email
    }
  }
`;

export const CREATE_GROUP_MUTATION = gql`
  mutation createGroup($name: String!, $description: String) {
    createGroup(name: $name, description: $description) {
      name
      description
      id
    }
  }
`;

export const JOIN_GROUP_MUTATION = gql`
  mutation joinGroup($groupId: ID!) {
    joinGroup(groupId: $groupId) {
      id
      name
    }
  }
`;

export const LEAVE_GROUP_MUTATION = gql`
  mutation leaveGroup($groupId: ID!) {
    leaveGroup(groupId: $groupId) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_THREAD_MUTATION = gql`
  mutation createThread($groupId: ID!, $title: String!, $content: String!) {
    createThread(groupId: $groupId, title: $title, content: $content) {
      id
      title
      posts(first: 1) {
        id
        content
        author {
          id
          name
        }
      }
      group {
        id
      }
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($threadId: ID!, $content: String!) {
    createPost(threadId: $threadId, content: $content) {
      id
      content
      createdAt
      author {
        id
        name
      }
      thread {
        id
      }
    }
  }
`;
