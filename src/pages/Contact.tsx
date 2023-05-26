import React from "react";
import ContactForm from "../components/ContactForm";
import "./styles/Contact.css";

const Contact: React.FC = () => {
  return (
    <div className="contactPage">
      <div className="contactForm">
        <h2>Send us a message</h2>
        <ContactForm></ContactForm>
      </div>
      <div className="contactInfo">
        <h2>Contact Information</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: +1 123-456-7890</p>
        {/* Add more contact info or graphics here */}
      </div>
    </div>
  );
};

export default Contact;
