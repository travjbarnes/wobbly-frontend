// tslint:disable: jsx-no-lambda
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

import { screenWrapper } from "../../__stories__/ScreenWrapper";
import { someDateTime, someGiftedMessage, someUser } from "../../__stories__/testData";

import { Post } from ".";

storiesOf("molecules/Post", module)
  .addDecorator(screenWrapper({ backgroundColor: "white" }))
  .add("Single Message", () => <PostFixture messages={[someGiftedMessage()]} />)
  .add("Sequence (same user, same day)", () => (
    <PostFixture
      messages={[
        someGiftedMessage(0, { createdAt: someDateTime(0, 0), user: someUser(0) }),
        someGiftedMessage(1, { createdAt: someDateTime(0, 1), user: someUser(0) })
      ]}
    />
  ))
  .add("Sequence (different user, same day)", () => (
    <PostFixture
      messages={[
        someGiftedMessage(0, { createdAt: someDateTime(0, 0), user: someUser(0) }),
        someGiftedMessage(1, { createdAt: someDateTime(0, 1), user: someUser(1) })
      ]}
    />
  ))
  .add("Sequence (same user, different day)", () => (
    <PostFixture
      messages={[
        someGiftedMessage(0, { createdAt: someDateTime(0, 0), user: someUser(0) }),
        someGiftedMessage(1, { createdAt: someDateTime(1, 0), user: someUser(0) })
      ]}
    />
  ));

interface IPostsProps {
  messages: IMessage[];
}
const PostFixture = ({ messages }: IPostsProps) => (
  <GiftedChat
    renderComposer={() => null}
    messages={messages}
    onSend={action("send")}
    isAnimated={true}
    user={someUser()}
    showAvatarForEveryMessage={true}
    renderMessage={props => <Post {...props} />}
  />
);
