import React, { useState } from 'react';

/**
 * A testimonial slider component that cycles through customer stories.
 * All styles are inline and the component is fully self-contained.
 */
const TestimonialsSection = () => {

  // --- Demo Content for the Slider ---
  const testimonials = [
    {
      quote: "EdgeSpark's AI-powered solutions transformed the way we operate. Their ability to understand our challenges and co-create scalable, sustainable tech has been game-changing for our business.",
      author: "COO, Global BFSI Enterprise"
    },
    {
      quote: "The digital transformation strategy they developed was not just innovative, but practical. We saw a 40% increase in efficiency within the first six months. Truly remarkable.",
      author: "CEO, Tech Startup"
    },
    {
      quote: "Working with the EdgeSpark team on our Green Tech initiative was a seamless experience. Their expertise in sustainable AI is unparalleled and has set us on a new path for growth.",
      author: "Director of Sustainability, Fortune 500 Company"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // --- Slider Navigation Logic ---
  const handleNavigation = (direction) => {
    setIsFading(true);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      }
      setIsFading(false);
    }, 250); // This timeout should match the CSS transition duration
  };


  // --- SVG Arrow Icon ---
  const ArrowIcon = ({ direction = 'right' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}>
      <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

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
    heading: {
      fontSize: 'clamp(2.2rem, 5vw, 3rem)',
      fontWeight: '600',
      lineHeight: 1.25,
      textAlign: 'center',
      marginBottom: '60px',
    },
    sliderContainer: {
      maxWidth: '900px', // Increased from 900px
      margin: '0 auto',
      padding: '80px 100px', // Increased padding
      backgroundColor: '#eff1fc',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      minHeight: '150px', // Added minimum height for better proportion
    },
    testimonialContent: {
      textAlign: 'center',
      transition: 'opacity 0.25s ease-in-out',
      opacity: isFading ? 0 : 1,
    },
    quote: {
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      lineHeight: 1.7,
      color: '#333d5a',
      marginBottom: '32px',
      fontStyle: 'italic',
    },
    author: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#4f4c97',
    },
    arrowButton: {
      backgroundColor: '#07016a',
      border: 'none',
      borderRadius: '50%',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, background-color 0.2s ease',
      position: 'absolute', // Position arrows absolutely relative to slider container
    },
    arrowButtonHover: {
        transform: 'scale(1.1)',
    },
    leftArrow: {
        left: '20px',
    },
    rightArrow: {
        right: '20px',
    }
  };

  const mediaQueryStyle = `
    @media (max-width: 768px) {
      .testimonials-container {
        padding: 60px 25px !important;
      }
      .testimonials-slider-container {
        padding: 60px 70px !important;
      }
      .testimonials-heading {
        font-size: 2rem !important;
        margin-bottom: 40px !important;
      }
      .testimonials-quote {
        font-size: 1rem !important;
        margin-bottom: 24px !important;
      }
    }
    @media (max-width: 640px) {
      .testimonials-slider-container {
        padding: 50px 60px !important;
      }
      .testimonials-arrow-button {
        width: 40px !important;
        height: 40px !important;
      }
      .testimonials-left-arrow {
        left: 10px !important;
      }
      .testimonials-right-arrow {
        right: 10px !important;
      }
    }
    @media (max-width: 480px) {
      .testimonials-container {
        padding: 50px 15px !important;
      }
      .testimonials-slider-container {
        padding: 40px 50px !important;
      }
      .testimonials-heading {
        font-size: 1.75rem !important;
      }
    }
  `;
  
  // Custom component for the arrow buttons to handle hover state
  const ArrowButton = ({ direction, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const arrowStyle = direction === 'left' ? styles.leftArrow : styles.rightArrow;
    const combinedStyle = isHovered 
      ? { ...styles.arrowButton, ...arrowStyle, ...styles.arrowButtonHover } 
      : { ...styles.arrowButton, ...arrowStyle };

    return (
      <button 
        style={combinedStyle}
        className={`testimonials-arrow-button ${direction === 'left' ? 'testimonials-left-arrow' : 'testimonials-right-arrow'}`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ArrowIcon direction={direction} />
      </button>
    );
  };


  // --- Rendered Component ---
  return (
    <div style={styles.container} className="testimonials-container">
      <style>{mediaQueryStyle}</style>
      <h2 style={styles.heading} className="testimonials-heading">
        Customer Speaks..Real Stories. <br /> Real Impact.
      </h2>
      <div style={styles.sliderContainer} className="testimonials-slider-container">
        <ArrowButton direction="left" onClick={() => handleNavigation('prev')} />

        <div style={styles.testimonialContent}>
          <p style={styles.quote} className="testimonials-quote">"{testimonials[currentIndex].quote}"</p>
          <p style={styles.author}>{testimonials[currentIndex].author}</p>
        </div>
        
        <ArrowButton direction="right" onClick={() => handleNavigation('next')} />
      </div>
    </div>
  );
};

export default TestimonialsSection;
