import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";

import ToDoList from "./ToDoList";
import Users from "./Users";

function App() {
  return (
    <Center>
      <Box width="640px">
        <Heading>Reusable Table</Heading>
        <p>
          The same reusable <code>{"<Table/>"}</code> component should be able to render the To-Do List
          and Users list below. We should be able to use the table component for any other lists of objects
          we want our application to render.
        </p>
        <ToDoList />
        <Users />
      </Box>
    </Center>
  );
}

export default App;
