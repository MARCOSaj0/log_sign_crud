import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import './login.css';

const Login = () => {
    const dispatch = useDispatch();
    const loginData = useSelector((state) => state.login);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("asnd");
        console.log(loginData);
        if (loginData?.isLoggedIn) {
            navigate('/profile');
        }
        else if (!loginData?.loading && loginData?.error) {
            alert(loginData?.error);
        }
    }, [loginData]);


    const onSubmit = (data) => {
        console.log(data);
        dispatch(login(data));
    };

    const signupHandler = () => {
        navigate("/signup");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="main">
                <div className="form">
                    <h1>Login</h1>
                    <input
                        placeholder="Email"
                        type="email"
                        className="inputBox"
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
                        className="inputBox"
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
                    <div className="buttonCont">
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
            </div>
        </form>
    );
};

export default Login;