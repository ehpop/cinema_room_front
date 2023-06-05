import React, { useContext, useState } from "react";
import ContactForm from "../components/ContactForm";
import "./styles/Contact.css";
import MessageSubmitted from "./MessageSubmitted";
import { IContactInfo } from "../components/ContactForm";
import { AppContext } from "../App";

const Contact: React.FC = () => {
  const { submittedData } = useContext(AppContext);

  const pageContent = (
    <div className="contactPage">
      <div className="contactForm">
        <h2>Send us a message</h2>
        <ContactForm></ContactForm>
      </div>
      <div className="contactInfo">
        <h2>Contact Information</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: +1 123-456-7890</p>
      </div>
      {submittedData && (
        <MessageSubmitted contactData={submittedData}></MessageSubmitted>
      )}
    </div>
  );

  return pageContent;
};

export default Contact;
