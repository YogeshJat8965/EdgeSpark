import React, { useState, useEffect, useRef } from 'react';

/**
 * An "About" section component with a two-column layout.
 * All styles are inline for easy integration.
 * The image is a placeholder, which you can replace with your own asset.
 */
const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // IntersectionObserver for scroll-triggered animation
  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // --- Inline CSS Styles ---
  const styles = {
    container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: '80px 40px',
      backgroundColor: '#ffffff',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#212529',
      boxSizing: 'border-box',
      overflow: 'hidden',
      perspective: '1500px',
    },
    contentWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '60px',
      maxWidth: '1200px',
      width: '100%',
      flexWrap: 'wrap',
      transformStyle: 'preserve-3d',
    },
    textContainer: {
      flex: 1,
      minWidth: '300px',
      textAlign: 'left',
      opacity: isVisible ? 1 : 0,
      transform: isVisible 
        ? 'translate3d(0, 0, 0) rotateY(0deg) scale(1)' 
        : 'translate3d(-120px, 0, -80px) rotateY(-8deg) scale(0.95)',
      transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transitionDelay: '0.2s',
      willChange: 'transform, opacity',
      transformStyle: 'preserve-3d',
    },
    imageContainer: {
      flex: 1.2,
      minWidth: '280px',
      maxWidth: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      opacity: isVisible ? 1 : 0,
      transform: isVisible 
        ? 'translate3d(0, 0, 0) rotateY(0deg) scale(1)' 
        : 'translate3d(120px, 0, -80px) rotateY(8deg) scale(0.95)',
      transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transitionDelay: '0.4s',
      willChange: 'transform, opacity',
      transformStyle: 'preserve-3d',
    },
    heading: {
      fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)',
      fontWeight: '700',
      lineHeight: 1.3,
      marginBottom: '32px',
      color: '#1a202c',
      maxWidth: '600px',
    },
    paragraph: {
      fontSize: '16px',
      lineHeight: 1.7,
      marginBottom: '20px',
      maxWidth: '500px', // Keeps text lines from getting too long
      color: '#495057',
    },
    image: {
      width: '100%',
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '12px',
      boxShadow: isVisible 
        ? '0 20px 40px rgba(0, 0, 0, 0.15)' 
        : '0 10px 25px rgba(0, 0, 0, 0.1)',
      objectFit: 'cover',
      display: 'block',
      transform: isVisible ? 'scale(1)' : 'scale(0.98)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s',
    },
  };

  const mediaQueryStyle = `
    @media (max-width: 768px) {
      .about-content-wrapper {
        flex-direction: column-reverse !important;
        gap: 40px !important;
        padding: 0 !important;
      }
      .about-text-container,
      .about-image-container {
        min-width: 100% !important;
        max-width: 100% !important;
        width: 100% !important;
      }
      .about-text-container {
        text-align: center !important;
        padding: 0 20px !important;
      }
      .about-image-container {
        padding: 0 20px !important;
      }
      .about-heading {
        max-width: 100% !important;
      }
      .about-paragraph {
        max-width: 100% !important;
      }
      .about-image {
        max-width: 100% !important;
        width: 100% !important;
      }
    }
    @media (max-width: 480px) {
      .about-container {
        padding: 60px 15px !important;
      }
      .about-text-container,
      .about-image-container {
        padding: 0 !important;
      }
    }
  `;

  // --- Rendered Component ---
  return (
    <div style={styles.container} className="about-container" ref={sectionRef}>
      <style>{mediaQueryStyle}</style>
      <div style={styles.contentWrapper} className="about-content-wrapper">
        <div style={styles.textContainer} className="about-text-container">
          <h2 style={styles.heading} className="about-heading">
            EdgeSpark IT Ventures:<br />
            Building What's Next
          </h2>
          <p style={styles.paragraph} className="about-paragraph">
            EdgeSpark is a future-forward venture studio powering
            businesses at the intersection of AI,<b>Technology</b> , <b>Media</b> , and
            <b>Education</b>.
          </p>
          <p style={styles.paragraph} className="about-paragraph">
            We don't just keep up with innovation, we lead it. Through
            our specialized verticals, we deliver <b>Intelligent</b>, <b>Scalable</b>, and
            <b> Sustainable Solutions</b> that drive real-world impact.
          </p>
          <p style={styles.paragraph} className="about-paragraph">
            <b> From automation to upskilling, we help
            enterprises evolve faster, smarter, and stronger.</b>
          </p>
        </div>
        <div style={styles.imageContainer} className="about-image-container">
          <img
            src={require('../images/Mask Group 1.png')}
            alt="Business Meeting Office"
            style={styles.image}
            className="about-image"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
