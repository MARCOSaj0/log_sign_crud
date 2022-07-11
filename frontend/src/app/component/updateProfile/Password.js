import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { change_pass_URL } from "../../config";


const Password = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post(`${change_pass_URL}/${user._id}`, data)
            .then((res) => {
                navigate('/profile');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="main">
                <div className="form">
                    <h1>Change Password</h1>
                    <input
                        placeholder="Enter your old password"
                        type="password"
                        className="inputBox"
                        {...register("oldPass", {
                            required: true,
                            minLength: {
                                value: 6,
                                message: "Password must needs to be minimum 6 character",
                            },
                        })}
                    />
                    {errors.oldPass?.type === "required" && (
                        <p className="color">This field is required</p>
                    )}
                    {errors.oldPass?.type === "minLength" && (
                        <p className="color">{errors.oldPass?.message}</p>
                    )}
                    <input
                        placeholder="Enter your new password"
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
                        <button
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Password;