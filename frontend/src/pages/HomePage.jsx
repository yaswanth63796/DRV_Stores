import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../styles/HomePage.css';

const HomePage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

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

  // 10 high-quality images for the Netflix-style motion row
  const motionImages = [
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80', // Tomatoes
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', // Bread
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80', // Milk
    'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&q=80', // Eggs
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&q=80', // Oranges
    'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&q=80', // Coffee
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', // Rice
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80', // Spices
    'https://images.unsplash.com/photo-1474625936412-1f48648c66e2?w=400&q=80', // Oil
    'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&q=80', // Tea
  ];

  return (
    <div className="homepage">
      {/* 1. HERO SECTION (Centered Text) */}
      <section className="hero-slider">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          effect={'fade'}
          speed={1500}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
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
                <div className="slide-overlay slide-overlay-centered">
                  <div className="slide-content slide-content-centered">
                    <span className="hero-badge">DRV STORES — Since 2025</span>
                    <h2 className="slide-title">{image.title}</h2>
                    <p className="slide-description">{image.description}</p>
                    <div className="slide-cta slide-cta-centered">
                      <Link to="/register" className="btn btn-primary btn-large">
                        Shop Now →
                      </Link>
                      <Link to="/login" className="btn btn-secondary" style={{ backgroundColor: 'white', borderColor: 'transparent' }}>
                        Sign In
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2. NETFLIX-STYLE MOTION ROW */}
      <section className="netflix-motion-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>Top Picks for You</h2>
        </div>
        <div className="motion-container">
          <motion.div 
            className="motion-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {/* Render images twice for an infinite seamless loop */}
            {[...motionImages, ...motionImages].map((img, idx) => (
              <div className="motion-item" key={idx}>
                <img src={img} alt={`Product ${idx}`} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. SAAS FEATURES SECTION */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why shop at DRV Stores?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                  <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3>Real‑time inventory</h3>
              <p>See exactly what’s in stock at your local store – no more “out of stock” surprises.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>Quick billing</h3>
              <p>Walk in, pick up, pay in seconds. Or pre‑order online for pickup.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                  <line x1="2" y1="20" x2="22" y2="20"></line>
                </svg>
              </div>
              <h3>Smart analytics</h3>
              <p>Store owners get AI‑driven restock alerts and sales reports.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h3>Digital storefront</h3>
              <p>Browse, compare prices, and create your shopping list from home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AMAZON STYLE PRE-FOOTER BLOCKS */}
      <section className="amazon-pre-footer">
        <div className="container">
          <h2 className="section-title">More to Explore</h2>
          <div className="amazon-cards-grid">
            {/* Amazon Style Card 1 */}
            <div className="amazon-card">
              <h2>Daily Kitchen Staples</h2>
              <div className="card-image-grid">
                <div className="grid-item">
                  <img src="https://images.unsplash.com/photo-1585994474776-6c1fb5ec3d90?ixlib=rb-4.0.3&w=200&q=80" alt="Dal" />
                  <span>Dals & Pulses</span>
                </div>
                <div className="grid-item">
                  <img src="https://images.unsplash.com/photo-1626200419189-39ca1a34d0b2?ixlib=rb-4.0.3&w=200&q=80" alt="Rice" />
                  <span>Rice & Flours</span>
                </div>
                <div className="grid-item">
                  <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&w=200&q=80" alt="Spices" />
                  <span>Spices & Masalas</span>
                </div>
                <div className="grid-item">
                  <img src="https://images.unsplash.com/photo-1474625936412-1f48648c66e2?ixlib=rb-4.0.3&w=200&q=80" alt="Oil" />
                  <span>Cooking Oils</span>
                </div>
              </div>
              <Link to="/register" className="card-link">Shop staples</Link>
            </div>

            {/* Amazon Style Card 2 */}
            <div className="amazon-card">
              <h2>Household & Cleaning</h2>
              <div className="card-image-single">
                <img src="https://images.unsplash.com/photo-1584820927498-cafe2c1c6a65?ixlib=rb-4.0.3&w=400&q=80" alt="Cleaning" />
              </div>
              <Link to="/register" className="card-link">Shop household care</Link>
            </div>

            {/* Amazon Deals Row block spanning 2 columns */}
            <div className="amazon-deals-block">
              <div className="deals-header">
                <h2>Today's Local Deals</h2>
                <Link to="/register" className="card-link">See all deals</Link>
              </div>
              <div className="deals-scroll">
                {[
                  { img: motionImages[0], badge: "Up to 20% off", title: "Fresh Produce" },
                  { img: motionImages[1], badge: "Deal of the Day", title: "Bakery Items" },
                  { img: motionImages[2], badge: "15% off", title: "Fresh Dairy" },
                  { img: motionImages[3], badge: "Special Offer", title: "Farm Eggs" }
                ].map((deal, idx) => (
                  <div className="deal-item" key={idx}>
                    <div className="deal-img"><img src={deal.img} alt={deal.title} /></div>
                    <div className="deal-badge">{deal.badge}</div>
                    <p>{deal.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL LOCATION CTA */}
      <section className="cta-location" style={{ background: 'var(--bg-color)' }}>
        <div className="container">
          <div className="location-card" style={{ margin: '40px auto', maxWidth: '800px', justifyContent: 'center' }}>
            <div className="location-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4>DRV Smart Store</h4>
              <p>Devandoody Village, Anchetty Post, Krishnagiri District, Tamilnadu</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;