import React from "react";
import { Button, Form } from "semantic-ui-react";

const List = () => {
  return (
    <Form>
      <Form.Field>
        <label>Search</label>
        <input placeholder="Search" />
      </Form.Field>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default List;
