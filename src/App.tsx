import { DeleteIcon } from "@chakra-ui/icons";
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
import { SyntheticEvent, useEffect, useState } from "react";

import api, { ToDoItem } from "./api";

function App() {
  const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);
  const [newItemDescription, setNewItemDescription] = useState<string>("");

  useEffect(() => {
    async function getItems() {
      const { data } = await api.getList();
      if (data) setToDoItems(data);
    }
    getItems();
  }, []);

  function handleSubmitNewItem(event: SyntheticEvent): void {
    event.preventDefault();
    api.addItem({ description: newItemDescription }).then(({ data }) => {
      if (data) {
        setToDoItems(prev => [...prev, data])
        setNewItemDescription('')
      }
    })
  }

  function handleDeleteItem(id: number, index: number): void {
    api.deleteItem(id).then(response => {
      if (response.ok) {
        setToDoItems(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])
      }
    })
  }

  function handleToggleItem(id: number, index: number): void {
    api.toggleItem(id).then(response => {
      if (response.ok) {
        setToDoItems(prev => [
          ...prev.slice(0, index),
          { ...prev[index], completed: !prev[index].completed},
          ...prev.slice(index + 1)
        ])
      }
    })
  }

  return (
    <>
      <Center>
        <Box p={4} width="500px">
          <Heading>To-Do List</Heading>
        </Box>
      </Center>
      <Center>
        <Box p={4} width="500px">
          <List>
            {toDoItems.map((item, index) => (
              <ListItem key={item.id}>
                <Flex
                  p={2}
                  alignItems="center"
                  bg={index % 2 === 0 ? "green.50" : "green.100"}
                >
                  <Checkbox
                    isChecked={item.completed}
                    marginRight={2}
                    onChange={() => handleToggleItem(item.id, index)}
                  />
                  <Text fontSize="lg">{item.description}</Text>
                  <Spacer />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete this item"
                    onClick={() => handleDeleteItem(item.id, index)}
                  />
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
      </Center>
      <Center>
        <Box p={4} width="500px">
          <form onSubmit={handleSubmitNewItem}>
            <Flex>
              <FormControl>
                <Input
                  id="new-item"
                  type="text"
                  placeholder="Enter a new to-do item"
                  autoFocus
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                />
              </FormControl>
              <Button type="submit" marginLeft={2}>
                Submit
              </Button>
            </Flex>
          </form>
        </Box>
      </Center>
    </>
  );
}

export default App;
