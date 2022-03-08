import { ArrowLeftIcon, ArrowRightIcon, SearchIcon, AtSignIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Table as CTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { User } from "../types/User";
import ITableProps from "../types/Table";

import React from "react";

export const Table : React.FunctionComponent<ITableProps> = React.memo((props : ITableProps) => {
  const [users, setUsers] = React.useState<User[]>([])
  const [usersPerPage, setUsersPerPage] = React.useState<number>(10)
  const [currentPage, setCurrentPage] = React.useState<number>(1)

  React.useEffect(()=>{
    console.log(props.users)
    setUsers(props.users)
    setUsersPerPage(props.usersPerPage)
  }, [props.users])

  const indexLast = currentPage * usersPerPage;
  const indexFirst = indexLast - usersPerPage;
  const currentPageOfUsers = users.slice(indexFirst, indexLast);

  return (
    <CTable variant="striped">
      <Thead>
        <Tr>
          <Th><AtSignIcon /></Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Followers</Th>
        </Tr>
      </Thead>
      <Tbody>
      {currentPageOfUsers.map((user,index)=>{
        console.log(currentPageOfUsers.length)
        return(
          <Tr key={index}>
            <Td key={`user-${user.id}-photo`}></Td>
            <Td key={`user-${user.id}-username`}>{user.username}</Td>
            <Td key={`user-${user.id}-email`}>{user.email}</Td>
            <Td key={`user-${user.id}-followers`}>{user.followers.length}</Td>
          </Tr>)
      })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={2}>
            <Flex justifyContent="center">
              <InputGroup>
                <InputLeftElement pointerEvents="none"><SearchIcon /></InputLeftElement>
                <Input placeholder="Search" />
              </InputGroup>
            </Flex>
          </Td>
          <Td colSpan={1}>
            <Flex justifyContent="center" alignItems="center" style={{ gap: '0.25rem' }}>
              <IconButton
                aria-label="previous-page"
                size="sm"
                icon={<ArrowLeftIcon />}
              />
              <NumberInput step={1} defaultValue={1} min={1} max={100}>
                <NumberInputField />
              </NumberInput>
              <IconButton
                aria-label="next-page"
                size="sm"
                icon={<ArrowRightIcon />}
              />
            </Flex>
          </Td>
        </Tr>
      </Tfoot>
    </CTable>
  );
})
