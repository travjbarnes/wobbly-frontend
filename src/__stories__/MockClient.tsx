import { StoryDecorator } from "@storybook/react";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { SchemaLink } from "apollo-link-schema";
import { buildClientSchema, printSchema } from "graphql";
import { addMockFunctionsToSchema, makeExecutableSchema } from "graphql-tools";
import React from "react";
import { ApolloProvider } from "react-apollo";

import { someDateTime, someGroup, somePerson, somePost, someThread } from "./testData";

interface IMockClientOpts {
  mocks?: any;
}

export function withMockClient({ mocks }: IMockClientOpts = {}): StoryDecorator {
  const schema = makeExecutableSchema({
    typeDefs: convertSchemaToTypeDefs(require("../../.storybook/schema.json"))
  });

  addMockFunctionsToSchema({
    schema,
    mocks: {
      ...mocks,
      Person: () => somePerson(),
      Group: () => someGroup(),
      Thread: () => someThread(),
      DateTime: () => someDateTime(),
      Post: () => somePost()
    }
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({
      schema
    })
  });

  return story => <ApolloProvider client={client}>{story()}</ApolloProvider>;
}

function convertSchemaToTypeDefs(schema: any) {
  return printSchema(buildClientSchema(schema));
}
