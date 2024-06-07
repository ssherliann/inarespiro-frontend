import styles from "../../../src/pages/Products/Products.module.css"

export default function ProductCategory({ selectedCategory, handleCategoryChange, category }) {
  return (
    <div>
      <input
        type="radio"
        id={category}
        name="category"
        value={category}
        checked={selectedCategory === category}
        onChange={() => handleCategoryChange(category)}
        hidden
      />
      <label htmlFor={category} className={selectedCategory === category ? `${styles.categoryLabel} ${styles.selectedCategory}` : styles.categoryLabel}>
        {category}
      </label>
    </div>
  );
}
