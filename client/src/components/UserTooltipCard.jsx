import React, { useEffect } from "react";
import { Avatar, Row, Col, Text, css, Spacer, Grid } from "@nextui-org/react";
import FollowBtn from "./profile/FollowBtn";
import { Link } from "react-router-dom";

const UserTooltipCard = ({ user }) => {
  return (
    <>
      <Grid.Container
        className="user-twitter-card__container"
        css={{
          mw: "290px",
          borderRadius: "$lg",
          padding: "$sm",
          ...css,
        }}
      >
        <Row justify="space-between" align="center">
          <Col span={3}>
            <Avatar
              size="lg"
              src={user.avatar}
              color="gradient"
              bordered
              squared
            />
          </Col>
          <Col span={9}>
            <Row>
              <Grid xs={12} direction="column">
                <Text className="user-twitter-card__text" b size={15}>
                  {user.fullname}
                </Text>
                <Text
                  className="user-twitter-card__text"
                  size={14}
                  css={{ mt: "-$3" }}
                  color="#888888"
                >
                  <Link to={`profile/${user._id}`}>@{user.username}</Link>
                </Text>
              </Grid>
              <FollowBtn user={user} />
            </Row>
          </Col>
        </Row>
        <Grid.Container className="user-twitter-card__username-container">
          <Grid xs={12}>
            <Text
              className="user-twitter-card__text"
              size={14}
              css={{ mt: "$1" }}
              color="#888888"
            >
              {user.story}
            </Text>
          </Grid>
          <Grid.Container>
            <Text
              className="user-twitter-card__text"
              size={14}
              css={{ mt: "$1" }}
              color="#888888"
            >
              <a
                href={`https:/${user.website}`}
                target="_blank"
                rel="noreferrer"
              >
                {user.website}
              </a>
            </Text>
          </Grid.Container>
        </Grid.Container>

        <Grid.Container
          className="user-twitter-card__metrics-container"
          justify="flex-start"
          alignContent="center"
        >
          <Text className="user-twitter-card__text" size={14} color="#888888">
            <Text
              b
              color="foreground"
              className="user-twitter-card__text"
              size={14}
              css={{ mr: "$1" }}
            >
              {user.following.length}
            </Text>
            Following
          </Text>
          <Spacer inline x={0.5} />
          <Text className="user-twitter-card__text" size={14} color="#888888">
            <Text
              b
              color="foreground"
              className="user-twitter-card__text"
              size={14}
              css={{ mr: "$1" }}
            >
              {user.followers.length}
            </Text>
            {user.following.length > 1 ? "Followers" : "Follower"}
          </Text>
        </Grid.Container>
      </Grid.Container>
    </>
  );
};

export default UserTooltipCard;
