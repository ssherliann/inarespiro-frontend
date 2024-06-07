import styles from './Error404.module.css'

function Error404() {
  return (
    <div className={styles.page404}>
      <h1 className={styles.title404}>Error 404</h1>
      <p className={styles.description404}>This page was not found.</p>
    </div>
  );
}

export default Error404;
