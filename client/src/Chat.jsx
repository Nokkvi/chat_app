import React, { useState } from "react";

import { Container } from "react-bootstrap";

import MessageForm from "Components/MessageForm/MessageForm";
import Messages from "Components/Messages/Messages";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
  uri: `ws:localhost:4000/`,
  options: { reconnect: true },
});

const client = new ApolloClient({
  link,
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

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
