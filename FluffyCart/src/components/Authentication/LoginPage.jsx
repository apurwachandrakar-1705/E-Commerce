import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, login } from "../../services/userServices";
import "./LoginPage.css";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z.string().email().min(3),
  password: z.string().min(8),
});
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const location = useLocation();
  const [formError, setFormError] = useState("");
  const onSubmit = async (formData) => {
    try {
      await login(formData);
      const { state } = location;
      window.location = state ? state.form : "/";
    } catch (error) {
      setFormError(error.response.data.message);
    }
  };
  // Handling form using useSate
  //  const[user,setUser]=useState({
  //     name:"",
  //     phone:""
  // });

  // const handleSubmit =(e)=>{
  //     e.preventDefault()
  //     console.log(user);
  // }

  // Handling form using useRef
  //   const nameRef = useRef(null);
  //   const phoneRef = useRef(null);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const user = {
  //       name: "",
  //       phone: 0,
  //     };
  //     user.name = nameRef.current.value;
  //     user.phone = Number(phoneRef.current.value);
  //     console.log(user)
  //   };
  if(getUser()){
    return <Navigate to="/"/>
  }
  return (
    <section className="align_center form_page">
      <form
        action=""
        className="authentication_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              //   ref={nameRef}
              // onChange={(e)=>setUser({...user,name:e.target.value})}
              {...register("email")}
              className="form_text_input"
              placeholder="Enter your email "
              //   value={user.name}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Phone Number</label>
            <input
              id="password"
              type="password"
              //   ref={phoneRef}
              //  onChange={(e)=>setUser({...user,phone:Number(e.target.value)})}
              {...register("password")}
              className="form_text_input"
              //   value={user.phone}
              placeholder="Enter your password "
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
