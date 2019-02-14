/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: joinGroup
// ====================================================

export interface joinGroup_joinGroup {
  __typename: "Group";
  id: string;
  name: string;
}

export interface joinGroup {
  joinGroup: joinGroup_joinGroup;
}

export interface joinGroupVariables {
  groupId: string;
}
