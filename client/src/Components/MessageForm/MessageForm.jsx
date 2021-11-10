import React, { useState } from "react";

import { gql, useMutation } from "@apollo/client";

import {
  Row,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";

const POST_MESSAGE = gql`
  mutation ($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const MessageForm = ({ user }) => {
  const [content, setContent] = useState("");
  const [postMessage] = useMutation(POST_MESSAGE);
  const sendMessage = () => {
    if (content.length > 0) {
      postMessage({ variables: { user, content } });
    }
    setContent("");
  };

  return (
    <Row className="mt-1">
      <Col xs="12" className="">
        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col xs="10" lg="11">
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                Message
              </Form.Label>
              <InputGroup>
                <FormControl
                  autoComplete="off"
                  id="inlineFormInputGroup"
                  placeholder="Message"
                  onChange={(e) => setContent(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  value={content}
                />
              </InputGroup>
            </Col>
            <Col className="d-flex flex-row-reverse" xs="2" lg="1">
              <Button type="button" onClick={() => sendMessage()}>
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default MessageForm;
