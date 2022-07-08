import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
// import "./Login.css";
import { useDispatch } from "react-redux";
// import addUserData from "../../redux/action";
// import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";
import { login_URL } from "../../config/index";

const Login = () => {
    // const initialValues = { email: "", passwrod: "" };
    const [loading, setLoading] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    let navigate = useNavigate();


    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data);
        axios.post(login_URL, data)
            .then((res) => {
                console.log('login successful')
                // dispatch(addUserData(res.data.details));
                // localStorage.setItem("user", JSON.stringify(res.data.details));
                // navigate(`/join?name=${res.data.details.user.user_name}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const signupHandler = () => {
        navigate("/signup");
    };

    //   useEffect(() => {
    //     const userDetails = JSON.parse(localStorage.getItem("user"));

    //     if (userDetails) {
    //       dispatch(addUserData(userDetails));
    //       // console.log("data of user", userDetails);
    //       navigate(`/join?name=${userDetails.user.user_name}`);
    //     }
    //     setLoading(false);
    //   }, []);

    //   if (loading) {
    //     return (
    //       <Box
    //         sx={{
    //           display: "flex",
    //           height: "100vh",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <CircularProgress />
    //       </Box>
    //     );
    //   }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <h1>Login</h1>
                    <input
                        placeholder="Email"
                        type="email"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please enter a valid email",
                            },
                        })}
                    />
                    {errors.email?.type === "required" && (
                        <p className="color">This field is required</p>
                    )}
                    {errors.email?.type === "pattern" && (
                        <p className="color">{errors.email?.message}</p>
                    )}
                    <input
                        placeholder="Password"
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: {
                                value: 6,
                                message: "Password must needs to be minimum 6 character",
                            },
                        })}
                    />
                    {errors.password?.type === "required" && (
                        <p className="color">This field is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p className="color">{errors.password?.message}</p>
                    )}
                    <button type="submit">
                        Sign In
                    </button>
                    <button
                        type="submit"
                        onClick={signupHandler}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Login;