import { Link } from 'react-router-dom';
import shoesData from '../data/shoes.json';
import ImageWithFallback from '../components/ImageWithFallback';
import './Home.css';


const Home = () => {
  // Get first 6 shoes for featured section
  const featuredShoes = shoesData.slice(0, 6);

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-content">
          <h1>JUST DO IT</h1>
          <p>Discover the latest Nike shoes and apparel</p>
          <Link to="/products" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Nike Shoes</h2>
        <div className="products-grid">
          {featuredShoes.map((shoe) => (
            <div key={shoe.id} className="product-card">
              <Link to={`/product/${shoe.id}`}>
                <ImageWithFallback src={shoe.image} alt={shoe.name} />
                <h3>{shoe.name}</h3>
                <p>₹{shoe.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Promotions */}
      <section className="promotions">
        <div className="promotion-card">
          <h3>New Arrivals</h3>
          <p>Check out the latest drops</p>
        </div>
        <div className="promotion-card">
          <h3>Best Sellers</h3>
          <p>Most popular this month</p>
        </div>
      </section>
    </div>
  );
};

export default Home;