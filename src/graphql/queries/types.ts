import { Query, QueryResult } from "react-apollo";

import { getGroupDetails } from "../../generated/getGroupDetails";
import { getGroups } from "../../generated/getGroups";
import { getOwnInfo } from "../../generated/getOwnInfo";
import { getPosts, getPostsVariables } from "../../generated/getPosts";
import { getThreads, getThreadsVariables } from "../../generated/getThreads";

// tslint:disable:max-classes-per-file

export class OwnInfoQuery extends Query<getOwnInfo> {}
export type OwnInfoQueryResult = QueryResult<getOwnInfo>;

export class GroupsQuery extends Query<getGroups> {}
export type GroupsQueryResult = QueryResult<getGroups>;

export class GroupDetailsQuery extends Query<getGroupDetails> {}
export type GroupDetailsQueryResult = QueryResult<getGroupDetails>;

export class ThreadsQuery extends Query<getThreads, getThreadsVariables> {}
export type ThreadsQueryResult = QueryResult<getThreads, getThreadsVariables>;

export class PostsQuery extends Query<getPosts, getPostsVariables> {}
export type PostsQueryResult = QueryResult<getPosts, getPostsVariables>;
