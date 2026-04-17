import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../styles/HomePage.css';

const HomePage = () => {
  const { user } = useAuth();

  const sliderImages = [
    {
      url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
      title: 'Local Daily Provisions',
      description: 'Find all your daily household staples, snacks, and goods right around the corner.'
    },
    {
      url: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
      title: 'Support Small Shops',
      description: 'Streamline local inventory, manage daily stock, and create bills with ease.'
    },
    {
      url: 'https://images.unsplash.com/photo-1596649811796-03f43eb759c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
      title: 'Authentic Spices & Dals',
      description: 'Quality ingredients and packed goods stored perfectly for your kitchen needs.'
    }
  ];

  return (
    <div className="home">
      {/* Hero Image Slider Section */}
      <section className="hero-slider">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          effect={'fade'}
          speed={1500}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="hero-swiper"
          loop={true}
        >
          {sliderImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div 
                className="slide-background"
                style={{ backgroundImage: `url(${image.url})` }}
              >
                <div className="slide-overlay">
                  <div className="slide-content">
                    <h2 className="slide-title">{image.title}</h2>
                    <p className="slide-description">{image.description}</p>
                    <div className="slide-cta">
                      {user ? (
                        <Link to={`/${user.role}/dashboard`} className="btn btn-primary btn-large">
                          Go to Dashboard
                        </Link>
                      ) : (
                        <Link to="/register" className="btn btn-primary btn-large">
                          Shop Now
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products Local</div>
            </div>
            <div className="stat-item card">
              <div className="stat-number">1k+</div>
              <div className="stat-label">Happy Families</div>
            </div>
            <div className="stat-item card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Store Owners</div>
            </div>
            <div className="stat-item card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="home-content">
          {/* Features Grid */}
          <section className="features-section">
            <div className="section-header">
              <h2>Store Features</h2>
              <p>Everything you need for your local provisional shop</p>
            </div>
            <div className="home-features">
              <div className="feature-card card">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3>Inventory Management</h3>
                <p>Track stocks in real-time, get low-stock alerts, and manage product variants automatically.</p>
              </div>
              
              <div className="feature-card card">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3>Quick Billing</h3>
                <p>Generate professional receipts instantly and manage walk-in customers quickly.</p>
              </div>
              
              <div className="feature-card card">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                    <line x1="2" y1="20" x2="22" y2="20"></line>
                  </svg>
                </div>
                <h3>Sales Analytics</h3>
                <p>Review comprehensive sales summaries and gain insights on your fastest-moving goods.</p>
              </div>
              
              <div className="feature-card card">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </div>
                <h3>Digital Storefront</h3>
                <p>Allow your customers to browse catalogs and pre-order items before they pick them up.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="home-cta card">
            {user ? (
              <div className="welcome-message">
                <h2>Welcome, {user.username}!</h2>
                <p>Ready to check fresh arrivals or manage your store's stock today?</p>
                <div className="cta-buttons">
                  <Link to={`/${user.role}/dashboard`} className="btn btn-primary btn-large">
                    Dashboard
                  </Link>
                  <Link to={`/${user.role}/products`} className="btn btn-secondary btn-large">
                    View Catalog
                  </Link>
                </div>
              </div>
            ) : (
              <div className="auth-cta">
                <h2>Join Drv Stores</h2>
                <p>Register as a customer to browse local items and shop at the best prices.</p>
                <div className="cta-buttons">
                  <Link to="/register" className="btn btn-primary btn-large">
                    Sign Up Free
                  </Link>
                  <Link to="/login" className="btn btn-secondary btn-large">
                    Sign In
                  </Link>
                </div>
              </div>
            )}
          </section>

          {/* How It Works */}
          <section className="how-it-works-section">
            <div className="section-header">
              <h2>How It Works</h2>
              <p>Just a few steps to streamline your grocer experience</p>
            </div>
            <div className="steps">
              <div className="step card">
                <div className="step-number">1</div>
                <h3>Register Account</h3>
                <p>Sign up securely as a Customer.</p>
              </div>
              <div className="step card">
                <div className="step-number">2</div>
                <h3>Discover Items</h3>
                <p>Customers fill up their carts with high quality local goods.</p>
              </div>
              <div className="step card">
                <div className="step-number">3</div>
                <h3>Complete Order</h3>
                <p>Effortlessly checkout or generate automated retail bills.</p>
              </div>
            </div>
          </section>

          {/* Location Section */}
          <section className="location-section">
            <div className="section-header">
              <h2>Visit Our Store</h2>
              <p>Find us right in your neighborhood</p>
            </div>
            <a 
              href="https://www.google.com/maps/place/Arulmigu+Saneeshwara+Swamy+Kovil/@12.3530524,77.7137625,126m/data=!3m1!1e3!4m9!1m2!2m1!1sDevandoody+village+ancheety!3m5!1s0x3bae8fc4d034b367:0x6f9e4d9583e4f015!8m2!3d12.3534399!4d77.7143614!16s%2Fg%2F11crzpc2r9?entry=ttu&g_ep=EgoyMDI2MDQxNC4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="location-card card"
            >
              <div className="location-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="location-details">
                <h3>DRV Stores</h3>
                <p>Devandoody Village, Anchetty Post</p>
                <p>Krishnagiri District, Tamilnadu</p>
                <div style={{ marginTop: '1rem' }}>
                  <span className="btn btn-primary btn-small">
                    Open in Google Maps
                  </span>
                </div>
              </div>
            </a>
          </section>

        </div>
      </div>
    </div>
  );
};

export default HomePage;