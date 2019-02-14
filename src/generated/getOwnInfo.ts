/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getOwnInfo
// ====================================================

export interface getOwnInfo_me {
  __typename: "Person";
  id: string;
  name: string;
  email: string;
}

export interface getOwnInfo {
  me: getOwnInfo_me | null;
}
