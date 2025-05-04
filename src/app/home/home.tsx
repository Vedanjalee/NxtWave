// app/home/home.tsx

'use client'; // Add this line at the top

import React, { useState } from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import FilterSidebar, { Filters } from '../components/filterSideBar/filterSidebar';
import ProductCard from '../components/productCard/productCard';
import styles from '../styles/home.module.css';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
  color?: string;
  category: string; // Added category property
};

const getFilteredProducts = (products: Product[], filters: Filters) => {
  return products.filter((product) => {
    const inCategory =
      filters.categories.length === 0 || filters.categories.includes(product.category);
    const inPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
    const inColor = !filters.color || filters.color === product.color; // placeholder logic
    return inCategory && inPrice && inColor;
  });
};

const Home = ({ products }: { products: Product[] }) => {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 1000],
    color: null,
  });
  const [sortOption, setSortOption] = useState('recommended');

  const categories = [...new Set(products.map((p) => p.category))];
  const filteredProducts = getFilteredProducts(products, filters);

  // Handle sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-high-to-low':
        return b.price - a.price;
      case 'price-low-to-high':
        return a.price - b.price;
      case 'customer-rating':
        return b.rating.rate - a.rating.rate;
      default:
        return 0; // Default is 'recommended', no sorting applied
    }
  });

  return (
    <>
      <Header />
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            allCategories={categories}
          />
        </aside>
        <section className={styles.productSection}>
          <div className={styles.productHeader}>
            <span>{sortedProducts.length} Products</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={styles.filterDropdown}
            >
              <option value="recommended">Recommended</option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="customer-rating">Customer Rating</option>
            </select>
          </div>

          <div className={styles.productList}>
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                rating={product.rating}
                image={product.image}
                color={product.color}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
