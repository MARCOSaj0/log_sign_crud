import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, use } from "react-router-dom";
import { setLoggin } from "../../redux/userSlice";

const Profile = () => {
    const userData = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changePassHandler = () => {
        navigate('/profile/changePass');
    };

    const logoutHandler = () => {
        localStorage.removeItem("user");
        dispatch(setLoggin());
        navigate('/', {replace: true});
    };


    return (
        <div>
            <div>
                <div>
                    <h4>Name</h4>
                    <p>{userData.name}</p>
                </div>
                <div>
                    <h4>Email Id</h4>
                    <p>{userData.email}</p>
                </div>
                <div>
                    <h4>Gender</h4>
                    <p>{userData.gender}</p>
                </div>
                <div>
                    <h4>Phone no.</h4>
                    <p>{userData.phone}</p>
                </div>
                <div>
                    <h4>Date of Birth</h4>
                    <p>{userData.dob}</p>
                </div>
                <div>
                    <h4>Status</h4>
                    <p>{userData.status}</p>
                </div>
            </div>
            <button type="submit" onClick={changePassHandler}>Change Password</button>
            <button type="submit" onClick={logoutHandler}>Logout</button>
        </div>
    );
};

export default Profile;