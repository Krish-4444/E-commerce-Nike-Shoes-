import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import shoesData from '../data/shoes.json';
import ImageWithFallback from '../components/ImageWithFallback';
import './Products.css';

// Ensure stable display even if some shoe cards fail to load images
// (no functional changes; placeholder handled by ImageWithFallback)



const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Get unique categories
  const categories = [...new Set(shoesData.map(shoe => shoe.category))];
  
  // Get all unique sizes
  const allSizes = [...new Set(shoesData.flatMap(shoe => shoe.sizes))].sort((a, b) => a - b);

  // Filter products based on criteria
  const filteredProducts = useMemo(() => {
    return shoesData.filter(shoe => {
      // Search term filter
      const matchesSearch = shoe.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === '' || shoe.category === selectedCategory;
      
      // Price filter
      let matchesPrice = true;
      if (priceRange === 'under50') matchesPrice = shoe.price < 50;
      if (priceRange === '50to100') matchesPrice = shoe.price >= 50 && shoe.price <= 100;
      if (priceRange === '100to150') matchesPrice = shoe.price > 100 && shoe.price <= 150;
      if (priceRange === 'over150') matchesPrice = shoe.price > 150;
      
      // Size filter
      const matchesSize = selectedSize === '' || shoe.sizes.includes(Number(selectedSize));
      
      return matchesSearch && matchesCategory && matchesPrice && matchesSize;
    });
  }, [searchTerm, selectedCategory, priceRange, selectedSize]);

  return (
    <div className="products-page">
      <div className="products-container">
        <h1>All Products</h1>
        
        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="filter-select"
            >
              <option value="">All Prices</option>
              <option value="under50">Under ₹50</option>
              <option value="50to100">₹50 - ₹100</option>
              <option value="100to150">₹100 - ₹150</option>
              <option value="over150">Over ₹150</option>
            </select>
          </div>
          
          <div className="filter-group">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="filter-select"
            >
              <option value="">All Sizes</option>
              {allSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((shoe) => (
              <div key={shoe.id} className="product-card">
                <Link to={`/product/${shoe.id}`}>
                  <ImageWithFallback src={shoe.image} alt={shoe.name} />
                  <h3>{shoe.name}</h3>
                  <p className="price">₹{shoe.price}</p>
                  <button className="view-details-btn" type="button">View Details</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No products found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;