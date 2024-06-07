import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Button } from "@chakra-ui/react";
import { Table, Popconfirm } from "antd";
import { fetchProductList, deleteProduct } from "../../../api";
import styles from "./AdminProducts.module.css"

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    "admin:products",
    fetchProductList
  );

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>
              <Button className={styles.editButton}>Edit</Button>
            </Link>
            <Popconfirm
              title="Are you sure"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    alert("Product deleted");
                  },
                });
              }}
              onCancel={() => console.log("Cancel")}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <Button className={styles.deleteButton}>Delete</Button>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, [deleteMutation]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className={styles.adminProductsPage}>
      <nav>
        <Link to='/admin' className={styles.backLink}>Back</Link>
      </nav>
      <div>
        <div>
          <h1 className={styles.title}>
            Products
          </h1>
        </div>
        <Table dataSource={data} columns={columns} rowKey="_id" className={styles.productsTable}/>
      </div>
    </div>
  );
}

