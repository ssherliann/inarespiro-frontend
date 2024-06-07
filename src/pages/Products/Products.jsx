import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api.js";
import Cards from "../../components/Card/Card.jsx";
import ProductCategory from '../../components/ProductCategory/ProductCategory.jsx';
import styles from "./Products.module.css";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const handleCategoryChange = (category) => {
    console.log("Category changed to:", category);
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    console.log("Search query changed to:", event.target.value);
    setSearchQuery(event.target.value);
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;
      return morePagesExist ? allGroups.length + 1 : undefined;
    },
  });

  useEffect(() => {
    console.log("Data fetched:", data);
    if (data && data.pages) {
      const allProducts = data.pages.flat();
      let filteredProducts = allProducts;

      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
      }

      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      console.log("Filtered products:", filteredProducts);
      setDisplayedProducts(filteredProducts);
    }
  }, [data, selectedCategory, searchQuery]);

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <div>
      <div className={styles.productPageContainer}>
        <div className={styles.categorySidebar}>
          <p className={styles.categoryTitle}>Categories</p>
          <input
            type="radio"
            id="All Products"
            name="category"
            value="All Products"
            checked={!selectedCategory}
            onChange={() => handleCategoryChange(null)}
            hidden
          />
          <label htmlFor="All Products" className={!selectedCategory ? `${styles.categoryLabel} ${styles.selectedCategory}` : styles.categoryLabel}>
            All Products
          </label>
          <ProductCategory selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} category="Rings" />
          <ProductCategory selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} category="Necklaces" />
          <ProductCategory selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} category="Bracelets" />
          <ProductCategory selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} category="Chains" />
          <ProductCategory selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} category="Earrings" />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <ul className={styles.productList}>
            {displayedProducts.map((product) => (
              <li key={product._id}>
                <Cards item={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.loadMoreContainer}>
      <button 
        className={`${styles.loadMoreButton} ${isFetchingNextPage ? styles.loadingButton : (hasNextPage ? styles.loadMoreButton : styles.nothingToLoadButton)}`}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
      </div>
    </div>
  );
}

export default Products;
