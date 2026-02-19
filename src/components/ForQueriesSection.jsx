import React, { useState, useEffect, useRef } from 'react';

function ForQueriesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contactCardsRef = useRef([]);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    companyName: '',
    industry: '',
    interestedIn: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.15, rootMargin: '-30px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Observer for contact cards
  useEffect(() => {
    const observers = contactCardsRef.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => {
                if (!prev.includes(index)) {
                  return [...prev, index];
                }
                return prev;
              });
            } else {
              setVisibleCards((prev) => prev.filter((i) => i !== index));
            }
          });
        },
        { threshold: 0.3, rootMargin: '-20px' }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Debug: Check if environment variables are loaded
    console.log('Environment variables check:');
    console.log('Service ID:', process.env.REACT_APP_EMAILJS_SERVICE_ID);
    console.log('Template ID:', process.env.REACT_APP_EMAILJS_TEMPLATE_ID);
    console.log('User ID:', process.env.REACT_APP_EMAILJS_USER_ID);

    // Validate environment variables
    if (!process.env.REACT_APP_EMAILJS_SERVICE_ID || 
        !process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 
        !process.env.REACT_APP_EMAILJS_USER_ID) {
      setSubmitMessage('Configuration error: EmailJS credentials not found. Please check environment variables.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Using EmailJS with your credentials
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID, // Your EmailJS service ID
          template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // Your EmailJS template ID
          user_id: process.env.REACT_APP_EMAILJS_USER_ID, // Your EmailJS user ID
          template_params: {
            to_email: 'yogeshjat8965@gmail.com',
            from_name: formData.fullName,
            from_email: formData.emailAddress,
            phone: formData.phoneNumber,
            company: formData.companyName,
            industry: formData.industry,
            interested_in: formData.interestedIn,
            message: formData.message,
            reply_to: formData.emailAddress
          }
        })
      });

      if (response.ok) {
        setSubmitMessage('Thank you! Your message has been sent successfully. We will get back to you soon.');
        setFormData({
          fullName: '',
          emailAddress: '',
          phoneNumber: '',
          companyName: '',
          industry: '',
          interestedIn: '',
          message: ''
        });
      } else {
        // Get more detailed error information
        const errorText = await response.text();
        console.error('EmailJS API Error:', response.status, errorText);
        throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      if (error.message.includes('Failed to send email')) {
        setSubmitMessage(`Error: ${error.message}. Please try again or contact us directly.`);
      } else {
        setSubmitMessage('Sorry, there was a network error. Please check your internet connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>
        {`
          /* Font import - You might need to add this to your public/index.html or global CSS */
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

          .for-queries-container {
            font-family: 'Inter', sans-serif;
            background-color: #ffffff; /* White background */
            padding: 80px 20px;
          }

          .queries-header {
            max-width: 1200px;
            margin: 0 auto 60px auto; /* Centered header, space below */
            padding-left: 20px; /* Aligns with the grid content below */
          }

          .queries-header h2 {
            font-size: 2.75rem; /* Larger font size for the main title */
            font-weight: 700; /* Bold */
            color: #1a202c; /* Dark text */
            margin-bottom: 8px;
            line-height: 1.2;
            transition: all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .queries-header.visible h2 {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }

          .queries-header:not(.visible) h2 {
            opacity: 0;
            transform: translate3d(0, 40px, 0) scale(0.95);
          }

          .queries-header p {
            font-size: 1.1rem; /* Description font size */
            color: #4a5568; /* Grey text */
            line-height: 1.6;
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
          }

          .queries-header.visible p {
            opacity: 1;
            transform: translateY(0);
          }

          .queries-header:not(.visible) p {
            opacity: 0;
            transform: translateY(20px);
          }

          .queries-content-grid {
            display: grid;
            grid-template-columns: 1fr 2fr; /* Left column (contact) takes 1 part, right (form) takes 2 parts */
            gap: 40px; /* Space between the two main columns */
            max-width: 1200px;
            margin: 0 auto;
            perspective: 1500px;
            transform-style: preserve-3d;
          }

          /* --- Left Column: Contact Info --- */
          .contact-info-column {
            display: flex;
            flex-direction: column;
            gap: 20px; /* Space between contact cards */
          }

          .contact-card {
            background-color: #f7f9fc; /* Light grey background for contact cards */
            border-radius: 8px;
            padding: 28px; /* Padding inside contact cards */
            display: flex;
            align-items: center; /* Vertically center icon and text */
            gap: 20px; /* Space between icon and text */
            min-height: 100px; /* Ensure consistent height */
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .contact-card.visible {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateY(0deg) scale(1);
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
          }

          .contact-card:not(.visible) {
            opacity: 0;
            transform: translate3d(-60px, 30px, -50px) rotateY(-8deg) scale(0.9);
          }

          .contact-icon {
            width: 50px;
            height: 50px;
            flex-shrink: 0; /* Prevent icon from shrinking */
            color: #4f46e5; /* Purple/indigo icon color */
          }

          .contact-icon svg {
            width: 100%;
            height: 100%;
          }

          .contact-details p {
            margin: 0;
            font-size: 0.9rem;
            color: #4a5568;
            line-height: 1.5;
          }

          .contact-details .highlight {
            font-weight: 600; /* Semi-bold for phone/email */
            color: #4f46e5; /* Purple/indigo color for highlight */
            font-size: 1rem; /* Same size as main text */
          }

          /* --- Right Column: Get a Call Back Form --- */
          .get-call-back-form-card {
            background-color: #f7f9fc; /* Light background for the form card */
            border-radius: 8px;
            padding: 36px; /* Padding inside the form card */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); /* Subtle shadow for the form card */
            transition: all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
          }

          .get-call-back-form-card.visible {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateY(0deg) scale(1);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          }

          .get-call-back-form-card:not(.visible) {
            opacity: 0;
            transform: translate3d(60px, 30px, -50px) rotateY(8deg) scale(0.95);
          }

          .get-call-back-form-card h3 {
            font-size: 1.75rem; /* Form title font size */
            font-weight: 700; /* Bold */
            color: #1a202c; /* Dark text */
            margin-bottom: 28px; /* Space below form title */
          }

          .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr; /* Two columns for form fields */
            gap: 18px; /* Space between form fields */
          }

          .form-group {
            display: flex;
            flex-direction: column;
          }

          .form-group.full-width {
            grid-column: span 2; /* Make this group span both columns */
          }

          .form-group label {
            font-size: 0.875rem;
            color: #374151;
            margin-bottom: 6px;
            font-weight: 500; /* Medium weight for labels */
          }

          /* Required asterisk styling */
          .form-group label .required {
            color: #e53e3e; /* Red color for asterisk */
            margin-left: 4px;
            font-weight: bold;
          }

          .form-group input,
          .form-group select,
          .form-group textarea {
            width: 100%;
            padding: 11px 14px;
            border: 1px solid #e5e7eb; /* Light grey border */
            border-radius: 6px;
            font-size: 0.95rem;
            color: #374151;
            background-color: #ffffff; /* White background for inputs */
            box-sizing: border-box; /* Include padding in element's total width/height */
            transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            -webkit-appearance: none; /* Remove default styling for select */
            -moz-appearance: none; /* Remove default styling for select */
            appearance: none; /* Remove default styling for select */
          }

          /* Invalid/required field styling */
          .form-group input:invalid,
          .form-group select:invalid,
          .form-group textarea:invalid {
            border-color: #e5e7eb; /* Same as default border */
          }
          
          .form-group input:focus,
          .form-group select:focus,
          .form-group textarea:focus {
            outline: none;
            border-color: #4f46e5; /* Indigo border on focus */
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); /* Subtle indigo glow on focus */
            background-color: #ffffff; /* White background on focus */
          }

          .form-group select {
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%236B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 9l-7 7-7-7"></path></svg>');
            background-repeat: no-repeat;
            background-position: right 12px center;
            background-size: 16px;
            padding-right: 35px; /* Make space for the custom arrow */
          }

          .form-group textarea {
            min-height: 120px; /* Multi-line text area height */
            resize: vertical; /* Allow vertical resizing */
          }

          .submit-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px 24px;
            background-color: #0000ff; /* Bright blue button background */
            border: none;
            border-radius: 6px;
            color: #ffffff;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            margin-top: 20px; /* Space above button */
            width: auto;
            max-width: 150px;
          }

          .submit-button:hover {
            background-color: #0000cc; /* Slightly darker blue on hover */
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 255, 0.4);
          }

          .submit-button:disabled {
            background-color: #9ca3af; /* Grey background when disabled */
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          .submit-button-icon {
            width: 20px;
            height: 20px;
            stroke-width: 2;
            color: #ffffff;
          }

          .submit-message {
            margin-top: 15px;
            padding: 12px;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 500;
          }

          .submit-message.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
          }

          .submit-message.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
          }

          /* Media Queries for Responsiveness */
          @media (max-width: 992px) {
            .queries-content-grid {
              grid-template-columns: 1fr; /* Stack columns on smaller screens */
              gap: 30px;
            }
            .queries-header {
              padding-left: 0; /* Remove left padding when stacked */
              text-align: center;
              margin-bottom: 40px;
            }
            .get-call-back-form-card {
              padding: 30px;
            }
            .get-call-back-form-card h3 {
              font-size: 1.6rem;
              margin-bottom: 25px;
            }
          }

          @media (max-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr; /* Stack form fields on very small screens */
              gap: 15px;
            }
            .form-group.full-width {
              grid-column: span 1; /* Reset to single column */
            }
            .queries-header h2 {
              font-size: 2rem;
            }
            .queries-header p {
              font-size: 1rem;
            }
            .contact-card {
              flex-direction: column; /* Stack icon and text */
              text-align: center;
              padding: 25px;
            }
            .contact-icon {
              margin-bottom: 10px;
            }
            .submit-button {
                width: 100%; /* Full width button on small screens */
                justify-content: center; /* Center button content */
            }
          }

          @media (max-width: 480px) {
            .for-queries-container {
              padding: 50px 15px;
            }
            .queries-header h2 {
              font-size: 1.8rem;
            }
          }
        `}
      </style>

      <div ref={sectionRef} className="for-queries-container" id="contact-section">
        <div ref={headerRef} className={`queries-header ${isVisible ? 'visible' : ''}`}>
          <h2>For Queries</h2>
          <p>Contact us if you have any queries.</p>
        </div>

        <div className="queries-content-grid">
          {/* Left Column: Contact Information */}
          <div className="contact-info-column">
            <div 
              ref={(el) => (contactCardsRef.current[0] = el)}
              className={`contact-card ${visibleCards.includes(0) ? 'visible' : ''}`}
              style={{
                transitionDelay: '0.1s'
              }}
            >
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div className="contact-details">
                <p>For more queries, speak to</p>
                <p className="highlight">+91 12345 6789</p>
              </div>
            </div>

            <div 
              ref={(el) => (contactCardsRef.current[1] = el)}
              className={`contact-card ${visibleCards.includes(1) ? 'visible' : ''}`}
              style={{
                transitionDelay: '0.25s'
              }}
            >
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="contact-details">
                <p>Email Us</p>
                <p className="highlight">contactus@.com</p>
              </div>
            </div>
          </div>

          {/* Right Column: Get a Call Back Form */}
          <div 
            ref={formRef}
            className={`get-call-back-form-card ${isVisible ? 'visible' : ''}`}
          >
            <h3>Get a Call Back</h3>
            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="form-group full-width">
                <label htmlFor="fullName">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  placeholder="" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="emailAddress">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="emailAddress" 
                  name="emailAddress" 
                  placeholder="" 
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  placeholder="" 
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="companyName">
                  Company Name
                </label>
                <input 
                  type="text" 
                  id="companyName" 
                  name="companyName" 
                  placeholder="" 
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="industry">
                  Industry
                </label>
                <select 
                  id="industry" 
                  name="industry" 
                  value={formData.industry}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance & Banking</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail & E-commerce</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="education">Education</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="logistics">Logistics & Transportation</option>
                  <option value="energy">Energy & Utilities</option>
                  <option value="media">Media & Entertainment</option>
                  <option value="government">Government & Public Sector</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="interestedIn">
                  Interested In
                </label>
                <select 
                  id="interestedIn" 
                  name="interestedIn" 
                  value={formData.interestedIn}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Service</option>
                  <option value="ai-lifebot">AI LifeBOT - Conversational AI Solutions</option>
                  <option value="appsolutely">Appsolutely - AI Consulting & Development</option>
                  <option value="cxo-techbot">CXO TechBOT - Tech Media & Insights</option>
                  <option value="skillz4">SKILLZ4 - AI-Powered Learning Platform</option>
                  <option value="digital-transformation">Digital Transformation Consulting</option>
                  <option value="custom-ai-solutions">Custom AI Solutions</option>
                  <option value="automation-services">Business Process Automation</option>
                  <option value="other">Other Services</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label htmlFor="message">
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  placeholder=""
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="submit-button-icon"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </button>

              {/* Success/Error Message */}
              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('Thank you') ? 'success' : 'error'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForQueriesSection;