import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import { fetchOrders } from "../../../api";
import styles from './Orders.module.css';

export default function Orders() {
  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchOrders
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error {error.message}</div>;
  }

  console.log("Data to render:", data);

  return (
    <div className={styles.ordersPage}>
      <nav>
        <Link to='/admin' className={styles.backLink}>Back</Link>
      </nav>
      <div className={styles.ordersTable}>
        <h1 className={styles.title}>Orders</h1>
        <Table variant="simple">
          <TableCaption>No orders</TableCaption>
          <Thead>
            <Tr>
              <Th>Users</Th>
              <Th>Address</Th>
              <Th>Items</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data && data.map((item) => (
              <Tr key={item._id}>
                {item.user === null ? (
                  <Td>No Name</Td>
                ) : (
                  <Td>{item.user.email}</Td>
                )}
                <Td>{item.address}</Td>
                <Td isNumeric>{item.items.length}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}
