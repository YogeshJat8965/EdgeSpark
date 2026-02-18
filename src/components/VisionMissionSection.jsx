import React, { useState, useEffect, useRef } from 'react';

// Import icons
import visionIcon from '../images/Path 8.svg';
import missionIcon from '../images/target_4147788.svg';

/**
 * A "Vision and Mission" section component with a multi-column layout.
 * All styles are inline for easy integration.
 * The image is a placeholder, which you should replace with your own asset.
 */
const VisionMissionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '-50px'
      }
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

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Icon Components with Animation ---
  const VisionIcon = ({ isVisible }) => (
    <img 
      src={visionIcon} 
      alt="Vision" 
      style={{
        width: '64px', 
        height: '64px', 
        objectFit: 'contain',
        transform: isVisible ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0.5)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionDelay: '0.5s',
      }} 
    />
  );

  const MissionIcon = ({ isVisible }) => (
    <img 
      src={missionIcon} 
      alt="Mission" 
      style={{
        width: '64px', 
        height: '64px', 
        objectFit: 'contain',
        transform: isVisible ? 'rotate(0deg) scale(1)' : 'rotate(180deg) scale(0.5)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionDelay: '0.8s',
      }} 
    />
  );


  // --- Inline CSS Styles ---
  const styles = {
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '80px 50px',
      backgroundColor: '#0a0f2c', // Dark blue background
      backgroundImage: 'radial-gradient(ellipse 50% 50% at 80% 20%, rgba(46, 49, 146, 0.3), transparent)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#e0e0e0', // Light text color
      boxSizing: 'border-box',
      perspective: '2000px',
      overflow: 'hidden',
    },
    heading: {
      fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
      fontWeight: '600',
      lineHeight: 1.2,
      marginBottom: '60px',
      textAlign: 'left',
      maxWidth: '1200px',
      margin: '0 auto 60px auto',
      width: '100%',
      opacity: isVisible ? 1 : 0,
      transform: isVisible 
        ? 'translate3d(0, 0, 0) scale(1)' 
        : 'translate3d(0, 60px, -100px) scale(0.9)',
      transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transitionDelay: '0.1s',
      transformStyle: 'preserve-3d',
    },
    contentGrid: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: '40px',
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      flexWrap: 'wrap',
      transformStyle: 'preserve-3d',
    },
    imageColumn: {
      flex: '2',
      minWidth: '400px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible 
        ? 'translate3d(0, 0, 0) rotateY(0deg) scale(1)' 
        : 'translate3d(-100px, 30px, -150px) rotateY(-15deg) scale(0.85)',
      transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transitionDelay: '0.3s',
      transformStyle: 'preserve-3d',
    },
    textColumnsWrapper: {
      flex: '2',
      display: 'flex',
      gap: '40px',
      flexWrap: 'wrap',
      transformStyle: 'preserve-3d',
    },
    visionMissionItem: {
      flex: 1,
      minWidth: '250px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible 
        ? 'translate3d(0, 0, 0) rotateX(0deg) scale(1)' 
        : 'translate3d(60px, -80px, -100px) rotateX(-10deg) scale(0.9)',
      transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transitionDelay: '0.5s',
      transformStyle: 'preserve-3d',
      background: 'rgba(255, 255, 255, 0.02)',
      padding: '20px',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: isVisible 
        ? '0 20px 60px rgba(0, 0, 0, 0.3)' 
        : '0 5px 15px rgba(0, 0, 0, 0.1)',
    },
    missionItem: {
      flex: 1,
      minWidth: '250px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginTop: '60px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible 
        ? 'translate3d(0, 0, 0) rotateX(0deg) scale(1)' 
        : 'translate3d(60px, 80px, -100px) rotateX(10deg) scale(0.9)',
      transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transitionDelay: '0.7s',
      transformStyle: 'preserve-3d',
      background: 'rgba(255, 255, 255, 0.02)',
      padding: '20px',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: isVisible 
        ? '0 20px 60px rgba(0, 0, 0, 0.3)' 
        : '0 5px 15px rgba(0, 0, 0, 0.1)',
    },
    itemHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    itemHeading: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#ffffff',
      margin: 0,
    },
    itemText: {
      fontSize: '15px', // Increased from 15px
      lineHeight: 1.7,
      margin: 0,
      opacity: 0.8,
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '12px',
      objectFit: 'cover',
      transform: `scale(${1 + scrollProgress * 0.05}) translate3d(0, ${scrollProgress * -20}px, 0)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: isVisible 
        ? '0 30px 80px rgba(0, 0, 0, 0.5)' 
        : '0 10px 30px rgba(0, 0, 0, 0.2)',
    },
  };

  const mediaQueryStyle = `
    @media (max-width: 992px) {
      .vision-container {
        padding: 60px 30px !important;
      }
      .vision-content-grid {
        flex-direction: column !important;
        gap: 40px !important;
      }
      .vision-image-column,
      .vision-text-columns-wrapper {
        min-width: 100% !important;
      }
      .vision-mission-item {
        margin-top: 0 !important;
      }
    }
    @media (max-width: 640px) {
      .vision-container {
        padding: 50px 20px !important;
      }
      .vision-heading {
        font-size: 2rem !important;
        margin-bottom: 40px !important;
      }
      .vision-text-columns-wrapper {
        gap: 30px !important;
      }
      .vision-mission-item,
      .vision-mission-item-2 {
        min-width: 100% !important;
      }
    }
  `;

  // --- Rendered Component ---
  return (
    <div 
      ref={sectionRef}
      style={styles.container} 
      id="vision-mission-section" 
      className="vision-container"
    >
      <style>{mediaQueryStyle}</style>
      <h2 style={styles.heading} className="vision-heading">
        Driven by Purpose. <br /> Fueled by Innovation..
      </h2>
      <div style={styles.contentGrid} className="vision-content-grid">
        <div style={styles.imageColumn} className="vision-image-column">
          <img
            src={require('../images/global-team-discussing-business-strategy.png')}
            alt="Mission"
            style={styles.image}
          />
        </div>
        <div style={styles.textColumnsWrapper} className="vision-text-columns-wrapper">
          <div style={styles.visionMissionItem} className="vision-mission-item">
            <div style={styles.itemHeader}>
              <VisionIcon isVisible={isVisible} />
              <h3 style={styles.itemHeading}>Our Vision</h3>
            </div>
            <p style={styles.itemText}>
              To lead the next wave of global transformation by delivering AI-driven, human-centered, and sustainable solutions that redefine industries, enhance enterprise resilience, and create meaningful impact for people and the planet.
            </p>
          </div>
          <div style={styles.missionItem} className="vision-mission-item-2">
            <div style={styles.itemHeader}>
              <MissionIcon isVisible={isVisible} />
              <h3 style={styles.itemHeading}>Our MISSION</h3>
            </div>
            <p style={styles.itemText}>
              Our mission is to empower organizations and communities with intelligent systems, inclusive innovation, and solutions that unlock growth, adaptability, and long-term value in a rapidly changing world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionSection;
