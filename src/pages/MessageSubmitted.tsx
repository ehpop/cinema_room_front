import React, { useContext } from "react";
import { IContactInfo } from "../components/ContactForm";
import "./styles/MessageSubmitted.css";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button";

interface IMessageSubmittedProps {
  contactData: IContactInfo | undefined;
}

const MessageSubmitted = ({ contactData }: IMessageSubmittedProps) => {
  const { setSubmittedData } = useContext(AppContext);

  const handleConfirm = () => {
    setSubmittedData(null);
  };

  const trimMessage = (message: string) => {
    return message.length > 20 ? message.substring(0, 20) + "..." : message;
  };

  return (
    <div className="message-submitted-container">
      <h2>Message Submitted</h2>
      <p>Your message has been successfully submitted.</p>
      <p>Thank you for contacting us!</p>
      <div className="message-submitted-details">
        <div>
          <span>Message: </span>
          <span>{contactData ? trimMessage(contactData.message) : ""}</span>
          <br />
          <span>Category: </span>
          <span>{contactData?.category}</span>
          <br />
          <span>Email: </span>
          <span>{contactData?.email}</span>
        </div>
        <br />
        <Button
          value="Confirm"
          className="confirm-button"
          onClick={handleConfirm}
          linkTo="/"
        ></Button>
      </div>
    </div>
  );
};

export default MessageSubmitted;
