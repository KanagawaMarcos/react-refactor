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
    <>
      <ToDoList />
      <Users />
    </>
  );
}

export default App;
