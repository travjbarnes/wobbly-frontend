/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createThread
// ====================================================

export interface createThread_createThread_posts_author {
  __typename: "Person";
  id: string;
  name: string;
}

export interface createThread_createThread_posts {
  __typename: "Post";
  id: string;
  content: string;
  author: createThread_createThread_posts_author;
}

export interface createThread_createThread {
  __typename: "Thread";
  id: string;
  title: string;
  posts: createThread_createThread_posts[];
}

export interface createThread {
  createThread: createThread_createThread;
}

export interface createThreadVariables {
  groupId: string;
  title: string;
  content: string;
}
