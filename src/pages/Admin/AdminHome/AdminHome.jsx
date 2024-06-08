import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import styles from './AdminHome.module.css';

export default function AdminHome() {
  return (
    <div className={styles.adminHomePage}>
      <h1 className={styles.title}>
        Welcome to Admin Panel
      </h1>
      <div className={styles.adminOption}>
        <p>Edit or delete your products</p>
        <Link to="/admin/products">
          <Button>
            Edit or Delete
          </Button>
        </Link>
      </div>
      <div className={styles.adminOption}>
        <p>Upload new products</p>
        <Link to="/admin/products/new">
          <Button>
            New Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
