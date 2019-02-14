/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPosts
// ====================================================

export interface getPosts_posts_author {
  __typename: "Person";
  id: string;
  name: string;
}

export interface getPosts_posts_thread {
  __typename: "Thread";
  id: string;
}

export interface getPosts_posts {
  __typename: "Post";
  id: string;
  content: string;
  createdAt: any;
  author: getPosts_posts_author;
  thread: getPosts_posts_thread;
}

export interface getPosts {
  posts: getPosts_posts[];
}

export interface getPostsVariables {
  threadId: string;
}
