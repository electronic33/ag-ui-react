import React from 'react';
import { Table, Thead, Tbody, Td, Th, Tr } from '../src';

export default {
  title: 'FORMS/Table',
  component: Table,
};

export const Default = () => (
  <Table>
    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
    <Thead>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr className="odd:bg-gray-300">
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td>25.4</Td>
      </Tr>
      <Tr className="odd:bg-gray-300">
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td>30.48</Td>
      </Tr>
      <Tr className="odd:bg-gray-300">
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td>0.91444</Td>
      </Tr>
    </Tbody>
    {/* <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th >multiply by</Th>
      </Tr>
    </Tfoot> */}
  </Table>
);
