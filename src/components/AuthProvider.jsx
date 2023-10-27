import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurentUser } from "../redux/features/auth";
import PageLoader from "./PageLoader";


function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurentUser()).unwrap().then(res => {
      if (!res) {
        navigate("/");
        
      }
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <PageLoader isLoading={isLoading} children={children} />
  );
}

export default AuthProvider;