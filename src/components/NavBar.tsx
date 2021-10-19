import { Box, Flex, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import { Button } from "@chakra-ui/button";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  //Loading
  if (fetching) {
    body = null;
  }
  //Not Logged In
  else if (!data?.me) {
    <>
      <NextLink href="/login">
        <Link color="white" mr={2}>
          Login
        </Link>
      </NextLink>
      <NextLink href="/register">
        <Link color="white" mr={2}>
          Register
        </Link>
      </NextLink>
    </>;
  }
  //Users is Logged In
  else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant="link">Logout</Button>
      </Flex>
    );
  }

  return (
    <Flex>
      <Box bg="tomato" p={4} ml={"auto"}>
        {body}
      </Box>
    </Flex>
  );
};
