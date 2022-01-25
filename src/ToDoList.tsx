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

import { ToDoItem } from "./types/ToDoItem";
import Table from "./Table";

function ToDoList() {
  const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);
  const [newItemDescription, setNewItemDescription] = useState<string>("");

  useEffect(() => {
    async function getItems() {
      const res = await fetch("http://localhost:3001/items");
      const data = await res.json();
      if (data) setToDoItems(data);
    }
    getItems();
  }, []);

  function handleSubmitNewItem(event: SyntheticEvent): void {
    event.preventDefault();
    async function createItem() {
      const response = await fetch("http://localhost:3001/items", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newItemDescription }),
      });
      const data = await response.json();
      if (data) {
        setToDoItems((prev) => [...prev, data]);
        setNewItemDescription("");
      }
    }

    createItem();
  }

  function handleDeleteItem(id: number, index: number): void {
    async function deleteItem() {
      const response = await fetch(`http://localhost:3001/items/${id}`, {
        method: "DELETE",
      });
      setToDoItems((prev) => [
        ...prev.slice(0, index),
        ...prev.slice(index + 1),
      ]);
    }

    deleteItem();
  }

  function handleToggleItem(id: number, index: number): void {
    async function toggleItem() {
      const response = await fetch(`http://localhost:3001/items/${id}/toggle`, {
        method: "PUT",
      });
      setToDoItems((prev) => [
        ...prev.slice(0, index),
        { ...prev[index], completed: !prev[index].completed },
        ...prev.slice(index + 1),
      ]);
    }
    toggleItem();
  }

  return (
    <>
      <Center>
        <Box p={4} width="640px">
          <Heading>To-Do List</Heading>
        </Box>
      </Center>

      <Center alignItems="baseline">
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
                  Done
                </Text>
                <Text fontSize={12} px={6} py={3} textTransform="uppercase">
                  Description
                </Text>
                <Text
                  fontSize={12}
                  px={6}
                  py={3}
                  textTransform="uppercase"
                ></Text>
              </Flex>
            </ListItem>
            {toDoItems.map((item, index) => (
              <ListItem key={item.id}>
                <Flex
                  alignItems="center"
                  bg={index % 2 === 0 ? "gray.100" : "white"}
                >
                  <Checkbox
                    isChecked={item.completed}
                    onChange={() => handleToggleItem(item.id, index)}
                    width={100}
                    px={6}
                    py={4}
                  />
                  <Text fontSize={16} px={6} py={4}>
                    {item.description}
                  </Text>
                  <Spacer />
                  <Box px={6} py={4}>
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Delete this item"
                      onClick={() => handleDeleteItem(item.id, index)}
                      size="xs"
                      background="gray.600"
                      _hover={{ bg: "red.600" }}
                      color="white"
                    />
                  </Box>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
      </Center>

      {/* <Center>
        <Box width="640px">
          <Table />
        </Box>
      </Center> */}

      <Center>
        <Box p={4} width="640px" bg="gray.50">
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

export default ToDoList;
