import {
  Box,
  Center,
  Flex,
  Heading,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { User } from "./types/User";
import Table from "./Table";

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      if (data) setUsers(data);
    }
    getUsers();
  });

  return (
    <>
      <Center>
        <Box p={4} width="640px">
          <Heading>Users</Heading>
        </Box>
      </Center>

      {/* <Center>
        <Box width="640px">
          <Table />
        </Box>
      </Center> */}

      {/* TODO replace the following block with the <Table /> component you create */}
      <Center>
        <Box width="640px">
          <List>
            <ListItem>
              <Flex alignItems="center" color="gray.600" fontWeight={600}>
                <Text
                  fontSize={12}
                  px={6}
                  py={3}
                  textTransform="uppercase"
                  width={100}
                >
                  Image
                </Text>
                <Text fontSize={12} px={6} py={3} textTransform="uppercase">
                  Name
                </Text>
                <Spacer />
                <Text fontSize={12} px={6} py={3} textTransform="uppercase">
                  Follow count
                </Text>
              </Flex>
            </ListItem>
            {users.map((item, index) => (
              <ListItem key={item.id}>
                <Flex
                  alignItems="center"
                  bg={index % 2 === 0 ? "gray.100" : "white"}
                >
                  <img src={item.avatarUrl} />
                  <Text fontSize={16} px={6} py={4}>
                    {item.username}
                  </Text>
                  <Spacer />
                  <Text fontSize={16} px={6} py={4}>
                    {item.followers.length}
                  </Text>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
      </Center>
    </>
  );
}

export default Users;
