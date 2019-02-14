/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getThreads
// ====================================================

export interface getThreads_threads_posts_author {
  __typename: "Person";
  id: string;
  name: string;
}

export interface getThreads_threads_posts {
  __typename: "Post";
  id: string;
  content: string;
  author: getThreads_threads_posts_author;
}

export interface getThreads_threads {
  __typename: "Thread";
  id: string;
  title: string;
  posts: getThreads_threads_posts[];
}

export interface getThreads {
  threads: getThreads_threads[] | null;
}

export interface getThreadsVariables {
  groupId: string;
}
