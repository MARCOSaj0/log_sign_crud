import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signup_URL } from "../../config/index";


const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    let navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        axios.post(signup_URL, data)
            .then((res) => {
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loginHandler = () => {
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="main">
                <div className="form">
                    <h1>Signup</h1>
                    <input
                        placeholder="Name"
                        type="text"
                        className="inputBox"
                        {...register("name", { required: true })}
                    />
                    {errors.name?.type === "required" && (
                        <p className="color">This field is required</p>
                    )}
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
                    <select {...register("gender", { required: true })} className="inputBox">
                        <option disabled selected>Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                    </select>
                    {errors.gender?.type === "required" && (
                        <p className="color">This field is required</p>
                    )}
                    <input
                        placeholder="Phone no."
                        type="number"
                        className="inputBox"
                        {...register("phone", {
                            required: true,
                            minLength: {
                                value: 10,
                                message: "Please enter valid phone no.",
                            },
                            maxLength: {
                                value: 10,
                                message: "Please enter valid phone no."
                            }
                        })}
                    />
                    {errors.phone?.type === "required" && (
                        <p className="color">This field is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p className="color">{errors.phone?.message}</p>
                    )}
                    {errors.password?.type === "maxLength" && (
                        <p className="color">{errors.phone?.message}</p>
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
                    <input
                        placeholder="DOB"
                        type="date"
                        className="inputBox"
                        {...register("dob", { required: true })}
                    />
                    {errors.date?.type === "required" && (
                        <p className="color">This field is required</p>
                    )}
                    <div className="buttonCont">
                        <button type="submit">
                            Sign Up
                        </button>
                        <button
                            type="submit"
                            onClick={loginHandler}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Signup;