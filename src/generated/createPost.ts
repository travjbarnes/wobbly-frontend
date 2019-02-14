/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPost
// ====================================================

export interface createPost_createPost_author {
  __typename: "Person";
  id: string;
  name: string;
}

export interface createPost_createPost_thread {
  __typename: "Thread";
  id: string;
}

export interface createPost_createPost {
  __typename: "Post";
  id: string;
  content: string;
  createdAt: any;
  author: createPost_createPost_author;
  thread: createPost_createPost_thread;
}

export interface createPost {
  createPost: createPost_createPost;
}

export interface createPostVariables {
  threadId: string;
  content: string;
}
