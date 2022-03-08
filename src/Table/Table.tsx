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
  Image,
  InputLeftElement,
} from "@chakra-ui/react";

import { User } from "../types/User";
import ITableProps from "../types/Table";

import React from "react";

export const Table : React.FunctionComponent<ITableProps<User>> = React.memo((props : ITableProps<User>) => {
  const [users, setUsers] = React.useState<User[]>([])
  // Pagination
  const [usersPerPage, setUsersPerPage] = React.useState<number>(10)
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  
  const indexLast = currentPage * usersPerPage;
  const indexFirst = indexLast - usersPerPage;
  
  // Search
  const [isSearching, setIsSearching] = React.useState<Boolean>(false)
  const [searchResult, setSearchResult] = React.useState<User[]>([])

  React.useEffect(()=>{
    setUsers(props?.users)
    setUsersPerPage(props?.usersPerPage)
  }, [props?.users])
  
  
  // Pagination
  const nextPage = () => {
    if(currentPage*usersPerPage < users.length){
      setCurrentPage(currentPage+1)
    }
  }

  const previousPage = () =>{
    if(currentPage > 1){
      setCurrentPage(currentPage-1)
    }
  }

  // Search
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsSearching(true)
    setSearchResult(props.users.filter(u => u?.username.includes(e.target.value) || u?.email.includes(e.target.value)))
    if(e.target.value === '' || e.target.value === ' '){
      setIsSearching(false)
    }
  }

  const renderPage = (users: User[]) =>{
    return users.sort(props.sortLambda).slice(indexFirst, indexLast).map((user,index)=>{
      return(
        <Tr key={index}>
          <Td key={`user-${user.id}-photo`}><Image src={user?.avatarUrl} /></Td>
          <Td key={`user-${user.id}-username`}>{user?.username}</Td>
          <Td key={`user-${user.id}-email`}>{user?.email}</Td>
          <Td key={`user-${user.id}-followers`}>{user?.followers?.length}</Td>
        </Tr>)
    })
  }

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
      {!isSearching && renderPage(users)}
      {isSearching && renderPage(searchResult)}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={2}>
            <Flex justifyContent="center">
              <InputGroup>
                <InputLeftElement pointerEvents="none"><SearchIcon /></InputLeftElement>
                <Input placeholder="Search" onChange={onSearchChange}/>
              </InputGroup>
            </Flex>
          </Td>
          <Td colSpan={1}>
            <Flex justifyContent="center" alignItems="center" style={{ gap: '0.25rem' }}>
              <IconButton
                onClick={previousPage}
                aria-label="previous-page"
                size="sm"
                icon={<ArrowLeftIcon />}
              />
              <NumberInput step={1} value={currentPage} defaultValue={currentPage} min={1} max={100}>
                <NumberInputField/>
              </NumberInput>
              <IconButton
                onClick={nextPage}
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
