import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggin, setUser } from "../../redux/userSlice";
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = localStorage.getItem("user");
    const data = JSON.parse(user);
    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        }
    }, []);
    const userData = useSelector((state) => state.user.user);


    const changePassHandler = () => {
        navigate('/profile/changePass');
    };

    const logoutHandler = () => {
        localStorage.removeItem("user");
        dispatch(setLoggin());
        navigate('/', { replace: true });
    };


    return (
        <div className="mainCont">
            <div>
                <div className="content">
                    <h4>Name</h4>
                    <p>{userData.name}</p>
                </div>
                <div className="content">
                    <h4>Email Id</h4>
                    <p>{userData.email}</p>
                </div>
                <div className="content">
                    <h4>Gender</h4>
                    <p>{userData.gender}</p>
                </div>
                <div className="content">
                    <h4>Phone no.</h4>
                    <p>{userData.phone}</p>
                </div>
                <div className="content">
                    <h4>Date of Birth</h4>
                    <p>{userData.dob}</p>
                </div>
                <div className="content">
                    <h4>Status</h4>
                    <p>{userData.status}</p>
                </div>
            </div>
            <div className="buttonCont">
                <button type="submit" onClick={changePassHandler}>Change Password</button>
                <button type="submit" onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;