/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updatePerson
// ====================================================

export interface updatePerson_updatePerson {
  __typename: "Person";
  name: string;
  email: string;
}

export interface updatePerson {
  updatePerson: updatePerson_updatePerson;
}

export interface updatePersonVariables {
  email?: string | null;
  password?: string | null;
  name?: string | null;
}
