/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchGroups
// ====================================================

export interface searchGroups_searchGroups {
  __typename: "Group";
  id: string;
  name: string;
}

export interface searchGroups {
  searchGroups: searchGroups_searchGroups[] | null;
}

export interface searchGroupsVariables {
  searchQuery: string;
}
