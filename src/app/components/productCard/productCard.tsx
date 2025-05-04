// 'use client';
import React from 'react';
import styles from './productCard.module.css';

interface ProductCardProps {
  title: string;
  price: number;
  rating: { rate: number; count: number };
  color?: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  rating,
  color = 'N/A',
  image,
}) => {
  return (
    <article className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.productDesc}>{title}</p>
        {/* <p className={styles.price}>${price.toFixed(2)}</p>
        <p className={styles.rating}>{rating.rate} ({rating.count})</p>
        <p className={styles.color}>Color: {color}</p> */}
      </div>
    </article>
  );
};

export default ProductCard;
