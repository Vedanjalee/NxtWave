'use client';
import React from 'react';
import styles from './productControls.module.css';

const ProductControls = ({ itemCount, sortOption, setSortOption, onToggleFilter }) => {
  return (
    <div className={styles.controlsWrapper}>
      <div className={styles.leftSection}>
        <span className={styles.itemCount}>{itemCount} ITEMS</span>
        <button className={styles.filterToggle} onClick={onToggleFilter}>
          <span className={styles.arrow}>&#x276E;</span> {/* Left arrow */}
          HIDE FILTER
        </button>
      </div>

      <div className={styles.sortDropdown}>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="recommended">RECOMMENDED</option>
          <option value="price-high-to-low">PRICE: HIGH TO LOW</option>
          <option value="price-low-to-high">PRICE: LOW TO HIGH</option>
          <option value="customer-rating">CUSTOMER RATING</option>
        </select>
      </div>
    </div>
  );
};

export default ProductControls;
