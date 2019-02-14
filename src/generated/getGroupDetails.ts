/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getGroupDetails
// ====================================================

export interface getGroupDetails_group_members {
  __typename: "Person";
  id: string;
  name: string;
}

export interface getGroupDetails_group {
  __typename: "Group";
  id: string;
  name: string;
  description: string | null;
  members: getGroupDetails_group_members[] | null;
}

export interface getGroupDetails {
  group: getGroupDetails_group | null;
}

export interface getGroupDetailsVariables {
  groupId: string;
}
