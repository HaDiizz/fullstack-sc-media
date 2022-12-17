import React from "react";
import { Text, Button, Grid, Row } from "@nextui-org/react";

const DeletePost = ({handleDeletePost}) => {
  return (
    <Grid.Container
      css={{
        borderRadius: "14px",
        padding: "0.75rem",
        minWidth: "330px",
      }}
    >
      <Row justify="center" align="center">
        <Text b>Confirm</Text>
      </Row>
      <Row>
        <Text className="p-2">
          Are you sure you want to delete this post ?, by doing this, you will
          not be able to recover the data.
        </Text>
      </Row>
      <Grid.Container justify="center" alignContent="center">
        <Grid>
          <button className="btn bg-red-500 text-white" onClick={handleDeletePost}>
            Delete
          </button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};

export default DeletePost;