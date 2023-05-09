import React, { useState, ChangeEvent } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
        <select {...register("category", { required: true })}>
          <option value="Not-Selected">Select a category</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Complaint">Complaint</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Other">Other</option>
        </select>
        {errors.message && (
          <p className="formError">{errors.message.message}</p>
        )}
        <textarea
          placeholder="Your message, complaint, suggestion, etc."
          rows={10}
          cols={40}
          {...register("message", { required: true })}
        ></textarea>
        {errors.email && <p className="formError">{errors.email.message}</p>}
        <input
          type="email"
          id="email"
          defaultValue={useAuth0().user?.email}
          {...register("email", { required: true })}
        />
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
