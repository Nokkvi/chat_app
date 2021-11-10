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
    console.log("setting content");
    setContent("");
  };

  return (
    <Row>
      <Col xs="12" className="">
        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col xs="11">
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                Message
              </Form.Label>
              <InputGroup className="mb-2">
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
            <Col xs="1">
              <Button
                type="button"
                className="mb-2"
                onClick={() => sendMessage()}
              >
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
