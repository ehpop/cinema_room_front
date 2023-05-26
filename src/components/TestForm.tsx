import React from "react";
import { useForm } from "react-hook-form";

const TestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "bill",
      lastName: "luo",
      email: "ala@ala",
      phoneNumber: "1234567890",
      address: "1234",
      city: "1234",
      state: "AL",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleSave = (formValues: any) => {
    console.log(formValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="First Name"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && <span>This field is required</span>}
        <input
          type="text"
          placeholder="Last Name"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && <span>This field is required</span>}
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <input
          type="text"
          placeholder="Phone Number"
          {...register("phoneNumber", { required: true })}
        />
        {errors.phoneNumber && <span>This field is required</span>}
        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: true })}
        />
        {errors.address && <span>This field is required</span>}
        <input
          type="text"
          placeholder="City"
          {...register("city", { required: true })}
        />
        {errors.city && <span>This field is required</span>}
        <select {...register("state", { required: true })}>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          {/* ... */}
          <option value="WY">Wyoming</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default TestForm;
