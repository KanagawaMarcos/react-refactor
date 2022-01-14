import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";

import React from "react";

export function Table(): React.ReactElement {
  return (
    <CTable variant="striped">
      <Thead>
      </Thead>
      <Tbody>
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={3}>
            <Flex justifyContent="center">
              <IconButton
                aria-label="previous-page"
                size="sm"
                icon={<ArrowLeftIcon />}
              />
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
}
