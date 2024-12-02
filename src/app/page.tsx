"use client"
import React, { useState } from "react";
import ProductList from "@/components/ProductList";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange as [number, number]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[250px_1fr] min-h-screen gap-8 p-8 pb-20 sm:p-20 mb-10">
      <aside className="bg-white shadow-lg p-6 rounded-lg h-4/5 space-y-6">
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>
        <div>
          <h3 className="font-bold text-orange-600">Filter by Category</h3>
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded-md text-gray-900"
          >
            <option value="">All</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Kitchen Appliances">Kitchen Appliances</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Sportswear">Sportswear</option>
          </select>
        </div>
        <div>
          <h3 className="font-bold text-orange-600">Filter by Price</h3>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-20 p-2 border rounded-md text-gray-900"
            />
            <span>-</span>
            <input
              type="number"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-20 p-2 border rounded-md text-gray-900"
            />
          </div>
        </div>
      </aside>
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <ProductList
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          priceRange={priceRange}
        />
      </main>
    </div>
  );
}
