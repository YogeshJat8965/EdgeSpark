import React from 'react';

/**
 * A call-to-action section component with video background.
 * All styles are inline for easy integration.
 */
const CallToActionSection = () => {
  // --- Video loading state ---
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  const handleVideoLoad = () => {
    console.log('Blue smoke video loaded successfully in CTA section');
    setVideoLoaded(true);
  };

  const handleVideoError = (e) => {
    console.error('Video failed to load in CTA section:', e.target.error);
    setVideoLoaded(false);
  };

  // --- Scroll Functions ---
  const handleGetStarted = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      const offsetTop = contactSection.offsetTop - 80; // 80px offset from top for better positioning
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // --- Inline CSS Styles ---
  const styles = {
    container: {
      position: 'relative',
      padding: '120px 20px',
      textAlign: 'center',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      overflow: 'hidden',
      minHeight: '450px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // Fallback background
      background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%), #0f172a',
    },
    videoBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 1,
      opacity: videoLoaded ? 1 : 0,
      transition: 'opacity 1s ease-in-out',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)', // Slightly darker overlay for better text readability
      zIndex: 2,
    },
    content: {
      position: 'relative',
      zIndex: 20,
      maxWidth: '800px',
      margin: '0 auto',
    },
    title: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: '700',
      lineHeight: 1.2,
      marginBottom: '20px',
      color: '#ffffff',
    },
    description: {
      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
      lineHeight: 1.6,
      marginBottom: '40px',
      opacity: 0.9,
      color: '#ffffff',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    },
    buttonBase: {
      padding: '14px 28px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      textDecoration: 'none',
      border: '2px solid transparent',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      minWidth: '200px',
      justifyContent: 'center',
    },
    primaryButton: {
      backgroundColor: '#ffffff',
      color: '#000000',
      border: '2px solid #ffffff',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#ffffff',
      border: '2px solid rgba(255, 255, 255, 0.6)',
    },
  };

  const [primaryHover, setPrimaryHover] = React.useState(false);

  const primaryButtonStyle = {
    ...styles.buttonBase,
    ...styles.primaryButton,
    transform: primaryHover ? 'scale(1.05)' : 'scale(1)',
    boxShadow: primaryHover ? '0 0 25px rgba(255, 255, 255, 0.4)' : 'none',
  };

  return (
    <section style={styles.container} className="cta-container">
      <style>{`
        @media (max-width: 768px) {
          .cta-container {
            padding: 80px 25px !important;
            min-height: 400px !important;
          }
          .cta-button-container {
            flex-direction: column !important;
            gap: 15px !important;
            width: 100% !important;
            max-width: 300px !important;
            margin: 0 auto !important;
          }
          .cta-button {
            width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .cta-container {
            padding: 60px 20px !important;
            min-height: 350px !important;
          }
          .cta-title {
            font-size: 1.75rem !important;
          }
          .cta-description {
            font-size: 1rem !important;
            margin-bottom: 30px !important;
          }
        }
      `}</style>
      {/* Video Background - Blue Smoke Effect */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={styles.videoBackground}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        onCanPlay={() => console.log('Blue smoke video can play in CTA')}
        preload="auto"
      >
        <source src={require('../images/bluesmokeffect.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability */}
      <div style={styles.overlay}></div>

      {/* Content */}
      <div style={styles.content}>
        <h2 style={styles.title} className="cta-title">
          Let's Build the Future,<br />
Together.
        </h2>
        <p style={styles.description} className="cta-description">
          Transform your business with cutting-edge Al, sustainable solutions,
and a future-ready workforce that drives impact and innovation.
        </p>
        <div style={styles.buttonContainer} className="cta-button-container">
          <button
            style={primaryButtonStyle}
            className="cta-button"
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => setPrimaryHover(false)}
            onClick={handleGetStarted}
          >
            Start a Conversation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </button>
          {/* <button
            style={secondaryButtonStyle}
            onMouseEnter={() => setSecondaryHover(true)}
            onMouseLeave={() => setSecondaryHover(false)}
            onClick={handleScheduleCall}
          > */}
            {/* Start a Conversation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg> */}
          {/* </button> */}
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;