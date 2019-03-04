import { IMessage, User } from "react-native-gifted-chat";

import { getThreads_threads, getThreads_threads_posts, getThreads_threads_posts_author } from "../generated/getThreads";

type DataGenerator<T> = (i?: number) => T;

export const someId = (i = 1, prefix = "id") => `${prefix}-${i}`;
export const someDateTime = (day = 0, hour = 0) => new Date(2010, 0, day + 1, hour, 0, 0, 0);
export const someMessageText = (i?: number) => pickOne(messageText, i);
export const someName = (i?: number) => pickOne(users, i).name;

export const someUser = (i?: number): User => ({
  _id: someId(i, "user"),
  ...pickOne(users, i)
});

export const someThread = (i?: number, overrides: Partial<getThreads_threads> = {}): getThreads_threads => ({
  __typename: "Thread",
  id: someId(i, "thread"),
  title: pickOne(threadTitles, i),
  pinned: false,
  posts: someSequence(5, somePost),
  ...overrides
});

export const somePost = (i?: number): getThreads_threads_posts => {
  const message = someGiftedMessage(i);
  return {
    __typename: "Post",
    id: someId(i, "post"),
    author: somePerson(i),
    content: message.text,
    createdAt: message.createdAt
  };
};

export const somePerson = (i?: number): getThreads_threads_posts_author => ({
  __typename: "Person",
  id: someId(i, "person"),
  name: someName(i)
});

export const someGiftedMessage = (i?: number, overrides: Partial<IMessage> = {}): IMessage => ({
  _id: someId(i, "message"),
  text: someMessageText(i),
  createdAt: someDateTime(i),
  user: someUser(i),
  ...overrides
});

export const someSequence = <T>(count: number, generator: DataGenerator<T>) => {
  const items: T[] = [];
  for (let i = 0; i < count; ++i) {
    items.push(generator(i));
  }
  return items;
};

const pickOne = <T>(collection: T[], i = 0) => collection[i % collection.length];

const users = [
  {
    name: "Emma Goldman",
    avatar: require("./images/goldman.jpg")
  },
  {
    name: "Skeletor",
    avatar: require("./images/skeletor.png")
  }
];
const threadTitles = ["Thing happening soon", "Another thing"];
const messageText = [
  "If love does not know how to give and take without restrictions, it is not love, but a transaction that never fails to lay stress on a plus and a minus",
  "If I can't dance, I don't want to be part of your revolution"
];
