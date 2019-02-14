/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getGroups
// ====================================================

export interface getGroups_groups {
  __typename: "Group";
  id: string;
  name: string;
  memberCount: number;
}

export interface getGroups {
  groups: getGroups_groups[] | null;
}
