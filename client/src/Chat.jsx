import React, { useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";

import MessageForm from "Components/MessageForm/MessageForm";
import Messages from "Components/Messages/Messages";
import SetUsernameModal from "Components/SetUsernameModal/SetUsernameModal";

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
  const [user, setUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <Container className="border p-1">
      <Row>
        <Col className="d-flex flex-row-reverse">
          <Button
            type="button"
            className="mb-2 btn-light"
            onClick={() => setIsModalOpen(true)}
          >
            Change Name
          </Button>
        </Col>
      </Row>
      <Messages user={user} />
      <MessageForm user={user} />
      <SetUsernameModal
        open={isModalOpen}
        onSubmit={setUser}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
