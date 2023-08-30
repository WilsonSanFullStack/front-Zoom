import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkUserById, getUserId } from "../redux/actionRegistroUser";

const Loading = () => {
  const init = useSelector((state) => state.init);
  const error = useSelector((state) => state.error);
  const users = useSelector((state) => state.user);
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState("");

  console.log(users);
  console.log(user);
  console.log(init);
  console.log(error)


  useEffect(() => {
    if (user || id) {
      console.log('tengo datos ')
      setId(user.id);
    }
    const checkUser = async () => {
      if (id) {
        console.log("tengo id");
        dispatch(checkUserById(id));
        console.log("ejecucion de checkuser");
        dispatch(getUserId(id));
        console.log("ejecucion de getuser");
      }
      if (init !== "") {
        console.log("ejecucion de if");
        if (init === true) {
          if (users.admin === true) {
            console.log("home");
            navigate("/home");
          } else {
            console.log("user");
            navigate("/user");
          }
        }
        if (init === false) {
          console.log("registro");
          navigate("/registro");
        }
      }
    };
    checkUser();
  }, [init, user, users, navigate, id, dispatch]);


  return (
    <div>
      <div className=" bg-fuchsia-400 min-h-screen flex justify-center items-center">
        <span className="loader scale-150"></span>
      </div>
    </div>
  );
};

export default Loading;
