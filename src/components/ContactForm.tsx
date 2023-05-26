import React, { useState, ChangeEvent } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles/ContactForm.css";

type Category =
  | "General Inquiry"
  | "Complaint"
  | "Suggestion"
  | "Other"
  | "Not-Selected";

interface ContactInfo {
  category: Category;
  email: string;
  message: string;
}

const ContactForm = () => {
  const ContactFormSchema = yup.object().shape({
    category: yup
      .string()
      .required()
      .oneOf(
        ["General Inquiry", "Complaint", "Suggestion", "Other"],
        "You must select a category"
      ),
    email: yup
      .string()
      .email("You must provide valid email!")
      .required("Email is required"),
    message: yup.string().required("Message is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInfo>({
    resolver: yupResolver(ContactFormSchema),
    defaultValues: {
      category: "Not-Selected",
      email: useAuth0().user?.email || "",
      message: "",
    },
  });

  const onSubmit = (data: ContactInfo) => {
    console.log(data);
  };

  return (
    <div className="ContactForm" onSubmit={handleSubmit(onSubmit)}>
      <form>
        {errors.category && (
          <p className="formError">{errors.category?.message}</p>
        )}
        <select
          {...register("category", { required: true })}
          className="select"
        >
          <option value="Not-Selected">Select a category</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Complaint">Complaint</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Other">Other</option>
        </select>
        {errors.message && (
          <p className="formError">{errors.message.message}</p>
        )}
        <div className="messageBox">
          <textarea
            placeholder="Your message, complaint, suggestion, etc."
            rows={10}
            cols={40}
            {...register("message", { required: true })}
          ></textarea>
          <p className="formDescription">
            If you have any inquiries or need assistance regarding our services,
            please provide us with the details of your request. Our support team
            is ready to assist you.
            <br />
            Additionally, if you have any questions or concerns about our Terms
            of Use, kindly include specific examples or samples showcasing the
            intended usage of our resources. If you are reporting a problem,
            please ensure to provide as much information as possible. This
            includes detailed descriptions, steps to reproduce the issue, and
            any relevant screenshots or videos that can help us understand and
            resolve the problem promptly. The more information you provide, the
            quicker we can address the issue and provide a satisfactory
            solution.
            <br />
            Once you submit your request, our dedicated support staff will
            prioritize your query and respond to you as soon as possible. We
            value your feedback and strive to provide excellent customer
            service. Thank you for choosing our services!
          </p>
        </div>
        <div className="emailBox">
          {errors.email && <p className="formError">{errors.email.message}</p>}
          <input
            type="email"
            id="email"
            defaultValue={useAuth0().user?.email}
            {...register("email", { required: true })}
          />
          <p className="formDescription">
            Please enter the email address where you wish to receive our
            response. If you are a registered user of our cinema website, kindly
            provide the email address associated with your account, if possible.
            This will help us locate your account and provide a prompt response.
          </p>
        </div>
        <ReCAPTCHA sitekey="6LfflQAmAAAAAI4qZU79RT9vr6Meburyh6KAgcWP" />
        <input
          type="submit"
          disabled={Object.keys(errors).length !== 0}
          value="Submit"
        />
      </form>
    </div>
  );
};

export default ContactForm;
