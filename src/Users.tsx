import {
  Box,
  Center,
  Heading,
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

      <Center>
        <Box width="640px">
          {/**
           * TODO: render Users table with avatar, username, and number of followers
          */}
          {users.map(u => <img src={u.avatarUrl} key={u.id} />)}
        </Box>
      </Center>
    </>
  );
}

export default Users;
