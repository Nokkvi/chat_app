import React, { useState } from "react";

import { Container } from "react-bootstrap";

import UserIcon from "Components/UserIcon/UserIcon";
import MessageForm from "Components/MessageForm/MessageForm";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const GET_MESSAGES = gql`
  query {
    messages {
      id
      user
      content
    }
  }
`;

const Messages = ({ user }) => {
  const { data } = useQuery(GET_MESSAGES, { pollInterval: 500 });
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

const Chat = () => {
  const [user, setUser] = useState("John");
  return (
    <Container>
      <Messages user={user} />
      <MessageForm user={user} />
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
