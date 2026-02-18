import React, { useState, useEffect, useRef } from 'react';

/**
 * A section to display service offerings with a grid of cards.
 * All styles are inline and the component is self-contained.
 */
const OfferingsSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [scrollProgress, setScrollProgress] = useState({});
  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          } else {
            setVisibleCards((prev) => prev.filter((i) => i !== index));
          }
        },
        {
          threshold: 0.2,
          rootMargin: '-50px'
        }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      const currentRefs = cardRefs.current;
      observers.forEach((observer, index) => {
        if (currentRefs[index]) {
          observer.unobserve(currentRefs[index]);
        }
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cardRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.8)));
          setScrollProgress(prev => ({ ...prev, [index]: progress }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Data for the 9 offering cards ---
  const offerings = [
    { title: <>AI & Business<br />Automation</>, imgSrc: require('../images/what we offer images/innovation.png') },
    { title: <>Custom GenAI &<br />Enterprise Copilots</>, imgSrc: require('../images/what we offer images/Group 24323.png') },
    { title: <>Sustainable AI &<br />Green Tech</>, imgSrc: require('../images/what we offer images/Group 24324.png') },
    { title: <>Future-Ready Skilling &<br />EdTech Solutions</>, imgSrc: require('../images/what we offer images/Group 24327.png') },
    { title: <>Digital Transformation &<br />IT Consulting</>, imgSrc: require('../images/what we offer images/Group 24326.png') },
    { title: <>Smart Governance &<br />GovTech Solutions</>, imgSrc: require('../images/what we offer images/Group 24325.png') },
    { title: <>CXO Media, Branding &<br />Thought Leadership</>, imgSrc: require('../images/Edgespark/Group 24330.png') },
    { title: <>Innovation Lab &<br />Prototyping</>, imgSrc: require('../images/what we offer images/Group 24329.png') },
    { title: <>CSR, Women Empowerment &<br />Social Innovation</>, imgSrc: require('../images/what we offer images/Group 24328.png') },
  ];

  // --- Inline CSS Styles ---
  const styles = {
    container: {
      width: '100%',
      padding: '80px 40px',
      backgroundColor: '#ffffff',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#0a0f2c',
      boxSizing: 'border-box',
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    heading: {
      fontSize: 'clamp(2.2rem, 5vw, 3rem)',
      fontWeight: '600',
      lineHeight: 1.2,
      marginBottom: '60px',
      textAlign: 'center', // Changed from 'left' to 'center'
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gridAutoRows: '1fr',
      gap: '30px',
    },
    cardWrapper: {
      height: '100%',
    },
    card: {
      backgroundColor: '#f7f8fa',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)',
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12), 0 10px 20px rgba(59, 130, 246, 0.08)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: '200px',
      overflow: 'hidden',
      backgroundColor: '#e5e7eb',
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      display: 'block',
    },
    cardContent: {
      padding: '24px',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      backgroundColor: '#ffffff',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '700',
      margin: 0,
      color: '#0a0f2c',
      lineHeight: '1.4',
    },
  };

  const mediaQueryStyle = `
    @media (max-width: 768px) {
      .offerings-container {
        padding: 60px 25px !important;
      }
      .offerings-card-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
        gap: 20px !important;
      }
      .offerings-heading {
        font-size: 2rem !important;
        margin-bottom: 40px !important;
      }
    }
    @media (max-width: 480px) {
      .offerings-container {
        padding: 50px 20px !important;
      }
      .offerings-card-grid {
        grid-template-columns: 1fr !important;
      }
      .offerings-heading {
        font-size: 1.75rem !important;
      }
    }
  `;

  // --- Card Component with Smooth Animations ---
  const OfferingCard = ({ title, imgSrc, index, isVisible, scrollProgress }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Determine entrance direction based on position
    const row = Math.floor(index / 3);
    const col = index % 3;
    const fromLeft = col === 0;
    const fromRight = col === 2;
    const fromCenter = col === 1;
    
    // Staggered delay based on row
    const delay = row * 0.15 + col * 0.08;
    
    // Calculate entrance transform
    let entranceX = 0;
    let entranceY = 50;
    if (fromLeft) entranceX = -60;
    else if (fromRight) entranceX = 60;
    else if (fromCenter) entranceY = 70;
    
    const cardStyle = {
      ...styles.card,
      ...(isHovered ? styles.cardHover : {}),
      opacity: isVisible ? 1 : 0,
      transform: isVisible 
        ? (isHovered ? 'translateY(-8px)' : 'translateY(0)')
        : `translate(${entranceX}px, ${entranceY}px)`,
      transition: isVisible 
        ? 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        : `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
    };
    
    // Parallax effect on image
    const progress = scrollProgress || 0;
    const imageTransform = `translateY(${progress * -15}px) scale(${1 + progress * 0.05})`;
    
    const imageStyle = {
      ...styles.cardImage,
      transform: isHovered ? 'scale(1.08)' : imageTransform,
      transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };
    
    const titleStyle = {
      ...styles.cardTitle,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay + 0.2}s`,
    };

    return (
      <div
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.imageContainer}>
          <img src={imgSrc} alt={title} style={imageStyle} />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 100%)',
            opacity: isHovered ? 0.6 : 0,
            transition: 'opacity 0.4s ease',
          }} />
        </div>
        <div style={styles.cardContent}>
          <h3 style={titleStyle}>{title}</h3>
        </div>
      </div>
    );
  };

  // --- Rendered Component ---
  return (
    <div style={styles.container} id="offerings-section" className="offerings-container">
      <style>{mediaQueryStyle}</style>
      <div style={styles.contentWrapper}>
        <h2 style={styles.heading} className="offerings-heading">What we Offer : Tailored for Business Growth</h2>
        <div style={styles.cardGrid} className="offerings-card-grid">
          {offerings.map((offer, index) => (
            <div 
              key={index} 
              ref={(el) => (cardRefs.current[index] = el)}
              style={styles.cardWrapper}
            >
              <OfferingCard 
                title={offer.title} 
                imgSrc={offer.imgSrc}
                index={index}
                isVisible={visibleCards.includes(index)}
                scrollProgress={scrollProgress[index] || 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferingsSection;
