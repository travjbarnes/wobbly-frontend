import { IMessage, User } from "react-native-gifted-chat";

type DataGenerator<T> = (i?: number) => T;

export const someId = (i = 1, prefix = "id") => `${prefix}-${i}`;
export const someDateTime = (day = 0, hour = 0) => new Date(2010, 0, day + 1, hour, 0, 0, 0);
export const someMessageText = (i?: number) => pickOne(messageText, i);
export const someName = (i?: number) => pickOne(people, i).name;
export const someEmail = (i?: number) => someName(i);

export const someUser = (i?: number): User => ({
  _id: someId(i, "user"),
  ...pickOne(people, i)
});

interface IThread {
  __typename: "Thread";
  id: string;
  title: string;
  pinned: boolean;
  posts: IPost[];
}
export const someThread = (i?: number): IThread => ({
  __typename: "Thread",
  id: someId(i, "thread"),
  title: pickOne(threadTitles, i),
  pinned: false,
  posts: someSequence(5, somePost)
});

interface IPost {
  __typename: "Post";
  id: string;
  author: IPerson;
  content: string;
  createdAt: Date;
}
export const somePost = (i?: number): IPost => {
  const message = someGiftedMessage(i);
  return {
    __typename: "Post",
    id: someId(i, "post"),
    author: somePerson(i),
    content: message.text,
    createdAt: message.createdAt
  };
};

interface IPerson {
  __typename: "Person";
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  emailConfirmed: boolean;
  groups: unknown[];
}
export const somePerson = (i?: number): IPerson => {
  const user = pickOne(people, i);

  return {
    __typename: "Person",
    id: someId(i, "person"),
    createdAt: someDateTime(i),
    name: user.name,
    email: user.name.replace(" ", ".").toLowerCase() + "@example.com",
    emailConfirmed: true,
    groups: []
  };
};

interface IGroup {
  __typename: "Group";
  id: string;
  createdAt: Date;
  name: string;
  description?: string;
  members: IPerson[];
  threads: IThread[];
  memberCount: number;
}
export const someGroup = (i?: number): IGroup => ({
  __typename: "Group",
  id: someId(i, "group"),
  ...pickOne(groups, i),
  createdAt: someDateTime(i),
  members: someSequence(2, somePerson),
  threads: someSequence(2, someThread),
  memberCount: 2
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

const people = [
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
const groups = [
  {
    name: "McDonald's London Road"
  },
  {
    name: "McDonald's Princes Street"
  }
];
