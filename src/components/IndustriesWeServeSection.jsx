import React, { useState, useEffect, useRef } from 'react';

// Import SVG icons from industries Edgespark folder
import bfsiIcon from '../images/industries Edgespark/Group 24274.svg';
import communicationIcon from '../images/industries Edgespark/communication_12687930.svg';
import energyIcon from '../images/industries Edgespark/Icon.svg';
import healthIcon from '../images/industries Edgespark/Group 23639.svg';
import supplyChainIcon from '../images/industries Edgespark/Group 24285.svg';
import retailIcon from '../images/industries Edgespark/Group 23714.svg';
import technologyIcon from '../images/industries Edgespark/processing_18739369.svg';
import hospitalityIcon from '../images/industries Edgespark/Group 24284.svg';
import educationIcon from '../images/industries Edgespark/Layer_x0020_1.svg';
import agricultureIcon from '../images/industries Edgespark/Group 24288.svg';
import governmentIcon from '../images/industries Edgespark/Group 24289.svg';

const industries = [
  {
    icon: <img src={bfsiIcon} alt="BFSI" style={{width: 48, height: 48, objectFit: 'contain', display: 'block'}} />,
    title: 'BFSI (Banking, Financial Services & Insurance)',
  },
  {
    icon: <img src={communicationIcon} alt="Communications, Media & Entertainment" style={{width: 48, height: 48, objectFit: 'contain', display: 'block'}} />,
    title: 'Communications, Media & Entertainment',
  },
  {
    icon: <img src={energyIcon} alt="Energy & Utilities" style={{width: 48, height: 48, objectFit: 'contain', display: 'block'}} />,
    title: 'Energy & Utilities',
  },
  {
    icon: <img src={healthIcon} alt="Health & Pharma" style={{width: 48, height: 48, objectFit: 'contain', display: 'block'}} />,
    title: 'Health & Pharma',
  },
  {
    icon: <img src={supplyChainIcon} alt="Supply Chain & Logistics" style={{width: 48, height: 48, objectFit: 'contain', display: 'block'}} />,
    title: 'Supply Chain & Logistics',
  },
  {
    icon: <img src={retailIcon} alt="Ecommerce & Retail" style={{width: 48, height: 48, objectFit: 'contain', display: 'block'}} />,
    title: 'Ecommerce & Retail',
  },
  {
    icon: <img src={technologyIcon} alt="Technology & Consulting" style={{width: 48, height: 48, objectFit: 'contain', display: 'block'}} />,
    title: 'Technology & Consulting',
  },
  {
    icon: <img src={hospitalityIcon} alt="Travel & Hospitality" style={{width: 48, height: 48, objectFit: 'contain', display: 'block'}} />,
    title: 'Travel & Hospitality',
  },
  {
    icon: <img src={educationIcon} alt="Education & Technology" style={{width: 48, height: 48, objectFit: 'contain', display: 'block'}} />,
    title: 'Education & Technology',
  },
  {
    icon: <img src={agricultureIcon} alt="Agriculture" style={{width: 48, height: 48, objectFit: 'contain', display: 'block'}} />,
    title: 'Agriculture',
  },
  {
    icon: <img src={governmentIcon} alt="Government & Public Services" style={{width: 48, height: 48, objectFit: 'contain', display: 'block'}} />,
    title: 'Government & Public Services',
  },
];

const IndustryCard = ({ icon, title, index, isVisible }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      className="industry-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? `translate3d(0, 0, 0) scale(1) rotateX(${mousePosition.y * 8}deg) rotateY(${mousePosition.x * 8}deg)` 
          : `translate3d(0, 80px, -60px) scale(0.85)`,
        transition: isVisible ? 'opacity 0.6s, transform 0.15s' : 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: isVisible ? '0s' : `${(index % 4) * 0.08}s`,
      }}
    >
      <div className="card-gradient-border"></div>
      <div className="card-shine"></div>
      <div className={`card-icon ${isVisible ? 'icon-animate-in' : ''}`}>{icon}</div>
      <h3 className="card-title">{title}</h3>
    </div>
  );
};

function IndustriesWeServeSection() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    const currentHeader = headerRef.current;
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        // Header visibility tracking can be added here if needed
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    );

    if (currentHeader) {
      headerObserver.observe(currentHeader);
    }

    return () => {
      if (currentHeader) {
        headerObserver.unobserve(currentHeader);
      }
    };
  }, []);

  useEffect(() => {
    const currentRefs = cardRefs.current;
    const observers = currentRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          } else {
            setVisibleCards((prev) => prev.filter((i) => i !== index));
          }
        },
        {
          threshold: 0.15,
          rootMargin: '-30px'
        }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (currentRefs[index]) {
          observer.unobserve(currentRefs[index]);
        }
      });
    };
  }, []);
  return (
    <>
      <style>
        {`
          /* Font import - You might need to add this to your public/index.html or global CSS */
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

          .industries-container {
            font-family: 'Inter', sans-serif;
            background-color: #EFF1FC;
            background-image: 
              radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.06) 0%, transparent 50%);
            padding: 80px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            overflow: hidden;
          }

          .section-header {
            text-align: center;
            margin-bottom: 60px;
            max-width: 800px;
            opacity: 0;
            transform: translateY(30px);
            animation: headerFadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }

          @keyframes headerFadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .section-title {
            font-size: 2.75rem;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 16px;
            line-height: 1.2;
          }

          .section-description {
            font-size: 1.5rem !important;
            color: #4a5568;
            line-height: 1.6;
          }

          .industries-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 1fr;
            gap: 24px;
            max-width: 1200px;
            width: 100%;
            perspective: 2000px;
          }

          .card-wrapper {
            height: 100%;
          }

          @media (max-width: 1200px) {
            .industries-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }
          }

          @media (max-width: 868px) {
            .industries-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
            }
            .section-title {
              font-size: 2rem;
            }
            .section-description {
              font-size: 0.95rem;
            }
            .industries-container {
              padding: 60px 15px;
            }
          }

          @media (max-width: 540px) {
            .industries-grid {
              grid-template-columns: 1fr;
            }
          }

          /* --- Industry Card Styling --- */
          .industry-card {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            justify-content: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            height: 100%;
            cursor: pointer;
            border: 1px solid transparent;
            position: relative;
            overflow: hidden;
            transform-style: preserve-3d;
          }

          .card-gradient-border {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 12px;
            padding: 2px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
            -webkit-mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.4s ease;
            pointer-events: none;
            z-index: 1;
          }

          .industry-card:hover .card-gradient-border {
            opacity: 1;
            animation: borderRotate 3s linear infinite;
          }

          @keyframes borderRotate {
            0% {
              filter: hue-rotate(0deg);
            }
            100% {
              filter: hue-rotate(360deg);
            }
          }

          .card-shine {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              45deg,
              transparent 30%,
              rgba(255, 255, 255, 0.4) 50%,
              transparent 70%
            );
            opacity: 0;
            transform: translateX(-100%);
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 2;
          }

          .industry-card:hover .card-shine {
            opacity: 1;
            animation: shine 1.5s ease-in-out;
          }

          @keyframes shine {
            0% {
              transform: translateX(-100%) translateY(-100%) rotate(45deg);
            }
            100% {
              transform: translateX(100%) translateY(100%) rotate(45deg);
            }
          }

          .industry-card:hover {
            background-color: #2e3092;
            box-shadow: 0 20px 40px rgba(46, 48, 146, 0.25), 0 10px 20px rgba(99, 102, 241, 0.15);
          }
          
          .industry-card:hover .card-icon svg {
            color: #ffffff;
          }

          .industry-card:hover .card-title {
            color: #ffffff !important;
          }

          .card-icon {
            width: 48px;
            height: 48px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            z-index: 3;
          }

          .card-icon::before {
            content: '';
            position: absolute;
            width: 65px;
            height: 65px;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
            border-radius: 50%;
            opacity: 0;
            transform: scale(0);
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: -1;
          }

          .industry-card:hover .card-icon::before {
            opacity: 1;
            transform: scale(1);
          }

          .card-icon img {
            width: 100%;
            height: 100%;
            transition: all 0.4s ease;
            filter: brightness(0) saturate(100%) invert(26%) sepia(94%) saturate(1679%) hue-rotate(218deg) brightness(100%) contrast(102%);
          }

          .industry-card:hover .card-icon {
            transform: scale(1.2) rotate(360deg);
          }

          .industry-card:hover .card-icon img {
            filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
          }

          /* Icon animation on scroll into view */
          .icon-animate-in {
            animation: iconSpinScale 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }

          .icon-animate-in::before {
            animation: iconBackgroundPulse 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
          }

          .icon-animate-in img {
            animation: iconColorPulse 1s ease 0.3s forwards;
          }

          @keyframes iconSpinScale {
            0% {
              transform: scale(0.4) rotate(0deg);
              opacity: 0;
            }
            60% {
              transform: scale(1.25) rotate(360deg);
              opacity: 1;
            }
            100% {
              transform: scale(1) rotate(360deg);
              opacity: 1;
            }
          }

          @keyframes iconBackgroundPulse {
            0% {
              opacity: 0;
              transform: scale(0);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.2);
            }
            100% {
              opacity: 0;
              transform: scale(1);
            }
          }

          @keyframes iconColorPulse {
            0%, 100% {
              filter: brightness(0) saturate(100%) invert(26%) sepia(94%) saturate(1679%) hue-rotate(218deg) brightness(100%) contrast(102%);
            }
            50% {
              filter: brightness(0) saturate(100%) invert(26%) sepia(94%) saturate(1679%) hue-rotate(218deg) brightness(150%) contrast(102%) drop-shadow(0 4px 12px rgba(99, 102, 241, 0.6));
            }
          }

          .card-icon svg {
            width: 100%;
            height: 100%;
            color: #3b82f6; /* Default blue icon color */
            transition: color 0.3s ease-in-out;
          }

          .card-title {
            font-size: 1rem;
            font-weight: 600;
            color: #1a202c;
            line-height: 1.4;
            transition: color 0.3s ease-in-out;
            position: relative;
            z-index: 3;
          }
        `}
      </style>

      <div className="industries-container">
        <div ref={headerRef} className="section-header">
          <h2 className="section-title">Industries We Serve</h2>
          <p className="section-description">
            We deliver value across a diverse range of industries, helping businesses
            achieve their digital transformation goals
          </p>
        </div>

        <div className="industries-grid">
          {industries.map((industry, index) => (
            <div 
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="card-wrapper"
            >
              <IndustryCard
                icon={industry.icon}
                title={industry.title}
                index={index}
                isVisible={visibleCards.includes(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default IndustriesWeServeSection;