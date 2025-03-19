import React, { useEffect} from "react";
import {useNavigate, useRoutes} from "react-router-dom";
import {useAuth} from "./authContext";



// Pages Components
import Profile from "./components/user/Profile.jsx";
import Dashboard from "./components/dashboard/Dashboard";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";



const ProjectRoutes = () => {
    const {user, setUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const userId = localStorage.getItem("userId");
        if(userId && !user){
            setUser(userId);
        }
        if(!userId && !["/auth", "/signup"].includes(window.location.pathname)){
            navigate("/auth");
        }
        if(userId && window.location.pathname === "/auth"){
            navigate("/");
        }
    },[user, setUser, navigate]);


    let element = useRoutes([
        {
            path: "/",
            element: <Dashboard />
        },
        {
            path:"/auth",
            element: <LogIn />
        },
        {
            path: "/signup",
            element: <SignUp />
        },
        {
            path: "/profile",
            element: <Profile />
        },
    ]);

    return element;


};

export default ProjectRoutes;