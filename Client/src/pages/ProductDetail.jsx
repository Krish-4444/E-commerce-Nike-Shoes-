import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import shoesData from '../data/shoes.json';
import { useCart } from '../context/CartContext';
import ImageWithFallback from '../components/ImageWithFallback';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  // Find the product by ID
  const product = shoesData.find(shoe => shoe.id === parseInt(id));
  
  // If product not found, show error
  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <h1>Product Not Found</h1>
          <Link to="/products" className="back-link">Back to Products</Link>
        </div>
      </div>
    );
  }

  // Set initial selected image
  useEffect(() => {
    setSelectedImage(product.image);
  }, [product]);

  // Get related products (same category, excluding current product)
  const relatedProducts = shoesData
    .filter(shoe => shoe.category === product.category && shoe.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
    alert(`${product.name} (Size ${selectedSize}) added to cart!`);
  };

  return (
    <div className="product-detail">
      <div className="container">
        <Link to="/products" className="back-link">← Back to Products</Link>
        
        <div className="product-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <ImageWithFallback src={selectedImage} alt={product.name} />
            </div>
            <div className="thumbnail-images">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className={selectedImage === product.image ? 'active' : ''}
                onClick={() => setSelectedImage(product.image)}
              />
              {/* In a real app, you would have multiple images here */}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="price">₹{product.price}</p>
            <p className="description">{product.description}</p>
            
            <div className="size-selection">
              <h3>Choose Size</h3>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Related Shoes</h2>
            <div className="related-grid">
              {relatedProducts.map(shoe => (
                <div key={shoe.id} className="related-product-card">
                  <Link to={`/product/${shoe.id}`}>
                    <ImageWithFallback src={shoe.image} alt={shoe.name} />
                    <h3>{shoe.name}</h3>
                    <p>₹{shoe.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;