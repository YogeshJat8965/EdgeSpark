import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * A carousel component to feature quotes from key people, like CEO or founder.
 * All styles are inline and the component is self-contained.
 */
const FounderVoiceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next');
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);

  // --- Content Data ---
  const voices = [
    {
      quote: "Our vision is to use technology as a force multiplier not just for business growth, but for building a smarter, more sustainable world. We believe in leveraging AI, automation, and digital intelligence to create inclusive ecosystems where innovation empowers people, industries, and the planet.",
      authorName: "Swati Gupta,Founder & CEO",
      authorTitle: "EdgeSpark Group of Companies",
      image: require('../images/Group 24321.png')
    },
    {
      quote: "At EdgeSpark, we don't just build solutions, we engineer the future. Our focus is on creating intelligent, sustainable, and human-centered innovations that empower organizations to lead with clarity and confidence in the age of Al. Every experience we deliver is designed to spark transformation that lasts.",
      authorName: "Puneet Agarwal, Co-Founder & CVO",
      authorTitle: "EdgeSpark Group of Companies",
      image: require('../images/PuneetSir.png')
    }
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: '-40px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Navigation
  const goTo = useCallback((direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection(direction);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentIndex((prev) => (prev + 1) % voices.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + voices.length) % voices.length);
      }
      setTimeout(() => setIsAnimating(false), 600);
    }, 400);
  }, [isAnimating, voices.length]);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      goTo('next');
    }, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [goTo]);

  const handleNav = (direction) => {
    clearInterval(autoPlayRef.current);
    goTo(direction);
    autoPlayRef.current = setInterval(() => {
      goTo('next');
    }, 5000);
  };

  const voice = voices[currentIndex];

  const mediaQueryStyle = `
    @media (max-width: 768px) {
      .fv-section-container {
        padding: 50px 24px 70px 24px !important;
      }
      .fv-voice-item {
        flex-direction: column !important;
        text-align: center !important;
        gap: 30px !important;
      }
      .fv-text-container {
        max-width: 100% !important;
        padding: 0 10px !important;
      }
      .fv-quote-wrapper {
        padding: 10px 16px !important;
      }
      .fv-quote-text {
        font-size: 1rem !important;
        line-height: 1.7 !important;
      }
      .fv-image-container {
        width: 200px !important;
        height: 200px !important;
      }
      .fv-image-container img {
        width: 200px !important;
        height: 200px !important;
      }
      .fv-nav-btn {
        width: 44px !important;
        height: 44px !important;
        left: 10px !important;
      }
      .fv-nav-btn.next {
        right: 10px !important;
        left: auto !important;
      }
      .fv-author-name {
        font-size: 1rem !important;
      }
      .fv-author-title {
        font-size: 0.9rem !important;
      }
      .fv-comma {
        width: 20px !important;
        height: 20px !important;
      }
    }
    
    @media (max-width: 480px) {
      .fv-section-container {
        padding: 40px 16px 60px 16px !important;
      }
      .fv-heading {
        font-size: 2rem !important;
        margin-bottom: 35px !important;
      }
      .fv-voice-item {
        gap: 24px !important;
      }
      .fv-text-container {
        padding: 0 5px !important;
      }
      .fv-quote-wrapper {
        padding: 8px 12px !important;
      }
      .fv-quote-text {
        font-size: 0.95rem !important;
        line-height: 1.65 !important;
      }
      .fv-image-container {
        width: 180px !important;
        height: 180px !important;
      }
      .fv-image-container img {
        width: 180px !important;
        height: 180px !important;
      }
      .fv-nav-btn {
        width: 40px !important;
        height: 40px !important;
        left: 5px !important;
        font-size: 18px !important;
      }
      .fv-nav-btn.next {
        right: 5px !important;
      }
      .fv-author-name {
        font-size: 0.95rem !important;
      }
      .fv-author-title {
        font-size: 0.85rem !important;
      }
      .fv-comma {
        width: 18px !important;
        height: 18px !important;
      }
      .fv-dots-container {
        margin-top: 30px !important;
      }
    }
  `;

  return (
    <div ref={sectionRef} className="fv-section-container" style={{
      width: '100%',
      padding: '60px 40px 100px 40px',
      backgroundColor: '#f6f8fa',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#0a0f2c',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }} id="founder-voice-section">
      <style>{mediaQueryStyle}</style>

      {/* Heading */}
      <h2 className="fv-heading" style={{
        fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
        fontWeight: '600',
        lineHeight: 1.2,
        marginBottom: '50px',
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
        transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>Voices That Drive Vision</h2>

      {/* Carousel */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <div
          className="fv-voice-item"
          key={currentIndex}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '60px',
            width: '100%',
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating
              ? `translateX(${slideDirection === 'next' ? '-60px' : '60px'})`
              : 'translateX(0)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          {/* Text */}
          <div
            className="fv-text-container"
            style={{
              flex: '1 1 auto',
              maxWidth: '600px',
              position: 'relative',
              opacity: isVisible && !isAnimating ? 1 : 0,
              transform: isVisible && !isAnimating
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(-40px, 20px, 0)',
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
            }}
          >
            <div className="fv-quote-wrapper" style={{ position: 'relative', padding: '10px 20px' }}>
              <img className="fv-comma" src={require('../images/comma.png')} alt="" style={{
                position: 'absolute', bottom: '-10px', right: '-20px',
                width: '25px', height: '25px', opacity: 0.6,
                filter: 'brightness(0) invert(40%)',
              }} />
              <img className="fv-comma" src={require('../images/comma.png')} alt="" style={{
                position: 'absolute', bottom: '-10px', right: '-5px',
                width: '25px', height: '25px', opacity: 0.6,
                filter: 'brightness(0) invert(40%)',
              }} />
              <p className="fv-quote-text" style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                lineHeight: 1.8,
                color: '#333d5a',
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 1,
              }}>{voice.quote}</p>
              <img className="fv-comma" src={require('../images/comma.png')} alt="" style={{
                position: 'absolute', top: '-10px', left: '-20px',
                width: '25px', height: '25px', transform: 'rotate(180deg)',
                opacity: 0.6, filter: 'brightness(0) invert(40%)',
              }} />
              <img className="fv-comma" src={require('../images/comma.png')} alt="" style={{
                position: 'absolute', top: '-10px', left: '-5px',
                width: '25px', height: '25px', transform: 'rotate(180deg)',
                opacity: 0.6, filter: 'brightness(0) invert(40%)',
              }} />
            </div>
            <div style={{ marginTop: '24px', paddingLeft: '20px' }}>
              <p className="fv-author-name" style={{ fontWeight: '700', fontSize: '1.1rem', margin: '0 0 4px 0', color: '#000' }}>{voice.authorName}</p>
              <p className="fv-author-title" style={{ fontSize: '1rem', color: '#000', margin: 0, fontWeight: '700' }}>{voice.authorTitle}</p>
            </div>
          </div>

          {/* Image */}
          <div
            className="fv-image-container"
            style={{
              flex: '0 0 auto',
              width: '280px',
              height: '280px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: isVisible && !isAnimating ? 1 : 0,
              transform: isVisible && !isAnimating
                ? 'translate3d(0, 0, 0) scale(1)'
                : 'translate3d(40px, 20px, 0) scale(0.85)',
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
            }}
          >
            <img
              src={voice.image}
              alt={voice.authorName}
              style={{
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          className="fv-nav-btn"
          onClick={() => handleNav('prev')}
          style={{
            position: 'absolute',
            left: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#0a0f2c',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 10,
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = '#2e3092'; e.target.style.transform = 'translateY(-50%) scale(1.1)'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = '#0a0f2c'; e.target.style.transform = 'translateY(-50%) scale(1)'; }}
        >&#8592;</button>

        <button
          className="fv-nav-btn next"
          onClick={() => handleNav('next')}
          style={{
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#0a0f2c',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 10,
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = '#2e3092'; e.target.style.transform = 'translateY(-50%) scale(1.1)'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = '#0a0f2c'; e.target.style.transform = 'translateY(-50%) scale(1)'; }}
        >&#8594;</button>

        {/* Dots */}
        <div className="fv-dots-container" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
          {voices.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index === currentIndex || isAnimating) return;
                clearInterval(autoPlayRef.current);
                setSlideDirection(index > currentIndex ? 'next' : 'prev');
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 600);
                }, 400);
                autoPlayRef.current = setInterval(() => goTo('next'), 5000);
              }}
              style={{
                width: currentIndex === index ? '32px' : '10px',
                height: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: currentIndex === index ? '#0a0f2c' : '#c0c5d0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FounderVoiceSection;
