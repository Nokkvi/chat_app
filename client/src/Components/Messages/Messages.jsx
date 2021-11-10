import React from "react";

import { useSubscription, gql } from "@apollo/client";

import UserIcon from "Components/UserIcon/UserIcon";

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      user
      content
    }
  }
`;

const Messages = ({ user }) => {
  const { data } = useSubscription(GET_MESSAGES);
  if (!data) {
    return null;
  }

  return (
    <>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <div
          key={id}
          className={`d-flex ${
            user === messageUser
              ? "justify-content-end"
              : "justify-content-start"
          } pb-1`}
        >
          {user !== messageUser && <UserIcon user={messageUser} />}
          <div
            className={`d-flex ${
              user === messageUser ? "bg-primary" : "bg-secondary"
            } bg-gradient p-2 rounded text-white mw-75`}
          >
            {content}
          </div>
        </div>
      ))}
    </>
  );
};

export default Messages;
