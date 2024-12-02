"use client";
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { CartItem } from '@/stores/AppContext';

interface ProductListProps {
  searchQuery: string;
  categoryFilter: string;
  priceRange: [number, number];
}

const ProductList: React.FC<ProductListProps> = ({
  searchQuery,
  categoryFilter,
  priceRange,
}) => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/products.json');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let updatedProducts = products;

      if (searchQuery) {
        updatedProducts = updatedProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (categoryFilter) {
        updatedProducts = updatedProducts.filter(
          (product) => product.category === categoryFilter
        );
      }

      updatedProducts = updatedProducts.filter(
        (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      setFilteredProducts(updatedProducts);
    };

    filterProducts();
  }, [searchQuery, categoryFilter, priceRange, products]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
      {filteredProducts.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          No products found.
        </p>
      )}
    </div>
  );
};

export default ProductList;
