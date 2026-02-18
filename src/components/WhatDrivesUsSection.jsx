import React, { useState, useEffect, useRef } from 'react';

// Import SVGs directly at the top
import innovationIcon from '../images/1.svg';
import excellenceIcon from '../images/2.svg';
import clientCentricIcon from '../images/3.svg';
import collaborativeIcon from '../images/4.svg';
import sustainabilityIcon from '../images/5.svg';
import empowermentIcon from '../images/6.svg';

const values = [
  {
    icon: <img src={innovationIcon} alt="Innovation" style={{width: 48, height: 48}} />,
    title: 'Innovation',
    description: 'We pioneer bold ideas and next-gen technologies that disrupt the ordinary and shape what\'s next.',
  },
  {
    icon: <img src={excellenceIcon} alt="Excellence" style={{width: 48, height: 48}} />,
    title: 'Excellence',
    description: 'We uphold uncompromising standards, delivering solutions with precision, integrity, and measurable impact.',
  },
  {
    icon: <img src={clientCentricIcon} alt="Client-Centric Approach" style={{width: 48, height: 48}} />,
    title: 'Client-Centric Approach',
    description: 'We design with purpose putting client challenges at the center of every solution we create.',
  },
  {
    icon: <img src={collaborativeIcon} alt="Collaborative Leadership" style={{width: 48, height: 48}} />,
    title: 'Collaborative Leadership',
    description: 'We believe in the power of collective intelligence driving transformation through shared vision and unified action.',
  },
  {
    icon: <img src={sustainabilityIcon} alt="Sustainability" style={{width: 48, height: 48}} />,
    title: 'Sustainability',
    description: 'We build with foresight, ensuring our solutions fuel progress while preserving the planet for future generations.',
  },
  {
    icon: <img src={empowermentIcon} alt="Empowerment" style={{width: 48, height: 48}} />,
    title: 'Empowerment',
    description: 'We unlock potential at every level elevating individuals, enabling teams, and uplifting communities through inclusive innovation.',
  },
];

const ValueCard = ({ icon, title, description, index, isVisible }) => {
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
      className="value-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? `translate3d(0, 0, 0) scale(1) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)` 
          : `translate3d(${index % 2 === 0 ? '-80px' : '80px'}, 60px, -50px) scale(0.9)`,
        transition: isVisible ? 'opacity 0.6s, transform 0.2s' : 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: isVisible ? '0s' : `${index * 0.1}s`,
      }}
    >
      <div className="card-gradient-border"></div>
      <div className="card-shine"></div>
      <div className={`card-icon ${isVisible ? 'icon-animate-in' : ''}`}>{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

function WhatDrivesUsSection() {
  const [visibleCards, setVisibleCards] = useState([]);
  const [headerVisible, setHeaderVisible] = useState(false);
  const cardRefs = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        setHeaderVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current);
      }
    };
  }, []);

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
        if (cardRefs.current[index]) {
          observer.unobserve(cardRefs.current[index]);
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

          .what-drives-us-container {
            font-family: 'Inter', sans-serif;
            background-color: #EFF1FC;
            background-image: 
              radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.08) 0%, transparent 50%);
            padding: 80px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            overflow: hidden;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          .section-header {
            text-align: center;
            margin-bottom: 60px;
            max-width: 800px;
            opacity: 0;
            transform: translateY(40px);
            animation: headerFadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }

          @keyframes headerFadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .section-title {
            font-size: 3.5rem;
            font-weight: 900;
            color: #1a202c;
            margin-bottom: 16px;
            line-height: 1.2;
            letter-spacing: 0.5px;
          }

          .section-description {
            font-size: 2.1rem !important;
            color: #4a5568;
            line-height: 1.7;
            font-weight: 700; /* Bold */
          }

          .values-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 1fr;
            gap: 28px;
            max-width: 1200px;
            width: 100%;
            perspective: 2000px;
          }

          @media (max-width: 1024px) {
            .values-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }
          }

          @media (max-width: 768px) {
            .values-grid {
              grid-template-columns: 1fr;
              gap: 16px;
            }
            .section-title {
              font-size: 2rem;
            }
            .section-description {
              font-size: 1.05rem;
            }
            .what-drives-us-container {
              padding: 50px 20px;
            }
            .value-card {
              padding: 28px;
              min-height: auto;
            }
          }

          @media (max-width: 480px) {
            .section-title {
              font-size: 1.75rem;
            }
            .section-description {
              font-size: 0.95rem !important;
            }
            .card-title {
              font-size: 1.2rem !important;
            }
            .card-description {
              font-size: 0.95rem;
            }
          }

          .value-card {
            background-color: #ffffff;
            border-radius: 14px;
            padding: 36px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05);
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);
            height: 100%;
            position: relative;
            overflow: hidden;
            transform-style: preserve-3d;
            cursor: pointer;
          }

          .value-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(236, 72, 153, 0.05));
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: 0;
          }

          .value-card:hover::before {
            opacity: 1;
          }

          .card-gradient-border {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 14px;
            padding: 2px;
            background: linear-gradient(135deg, #6366f1, #ec4899, #8b5cf6);
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

          .value-card:hover .card-gradient-border {
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
              rgba(255, 255, 255, 0.3) 50%,
              transparent 70%
            );
            opacity: 0;
            transform: translateX(-100%);
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 2;
          }

          .value-card:hover .card-shine {
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

          .value-card:hover {
            box-shadow: 0 20px 40px rgba(0,0,0,0.15), 0 10px 20px rgba(99, 102, 241, 0.1);
          }

          .card-icon {
            width: 56px;
            height: 56px;
            margin-bottom: 28px;
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
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15));
            border-radius: 50%;
            opacity: 0;
            transform: scale(0);
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: -1;
          }

          .value-card:hover .card-icon::before {
            opacity: 1;
            transform: scale(1);
          }

          .card-icon img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: brightness(0);
            transition: all 0.4s ease;
          }

          .value-card:hover .card-icon {
            transform: scale(1.2) rotate(360deg);
          }

          .value-card:hover .card-icon img {
            filter: brightness(0) drop-shadow(0 4px 12px rgba(99, 102, 241, 0.4));
          }

          /* Icon animation on scroll into view */
          .icon-animate-in {
            animation: iconSpinScale 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }

          .icon-animate-in::before {
            animation: iconBackgroundAppear 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards;
          }

          .icon-animate-in img {
            animation: iconGlow 1s ease 0.4s forwards;
          }

          @keyframes iconSpinScale {
            0% {
              transform: scale(0.5) rotate(0deg);
              opacity: 0;
            }
            60% {
              transform: scale(1.3) rotate(360deg);
              opacity: 1;
            }
            100% {
              transform: scale(1) rotate(360deg);
              opacity: 1;
            }
          }

          @keyframes iconBackgroundAppear {
            0% {
              opacity: 0;
              transform: scale(0);
            }
            70% {
              opacity: 1;
              transform: scale(1.1);
            }
            100% {
              opacity: 0;
              transform: scale(1);
            }
          }

          @keyframes iconGlow {
            0% {
              filter: brightness(0);
            }
            50% {
              filter: brightness(0) drop-shadow(0 6px 16px rgba(99, 102, 241, 0.7));
            }
            100% {
              filter: brightness(0);
            }
          }

          @keyframes iconEntrance {
            0% { opacity: 0; transform: scale(0.7) translateY(-20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }

          .card-title { 
            font-size: 1.4rem !important;
            font-weight: 700 !important;
            color: #000000 !important;
            margin-bottom: 14px;
            line-height: 1.3;
            letter-spacing: 0.3px;
            position: relative;
            z-index: 3;
          }

          .card-description {
            font-size: 1.08rem;
            color: #000000;
            line-height: 1.7;
            position: relative;
            z-index: 3;
          }

          .card-wrapper {
            height: 100%;
          }
        `}
      </style>
      <div className="what-drives-us-container" id="about-section">
        <div ref={headerRef} className="section-header">
          <h2 className="section-title">What Drives Us</h2>
          <p className="section-description">
            Our values guide every decision we make, every product we build,
            and every partnership we form.
          </p>
        </div>

        <div className="values-grid">
          {values.map((value, index) => (
            <div 
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="card-wrapper"
            >
              <ValueCard
                icon={value.icon}
                title={value.title}
                description={value.description}
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

export default WhatDrivesUsSection;