import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Await, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserById,
  getUserId,
} from "../../redux/actions/registro/registerUser.js";

const Loading = () => {
  const init = useSelector((state) => state.init);
  const error = useSelector((state) => state.error);
  const users = useSelector((state) => state.user);
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState("");

  useEffect(() => {
    if (user || id) {
      setId(user.id);
    }
    const checkUser = async () => {
      dispatch(checkUserById(id));
      dispatch(getUserId(id));

      console.log(users);
      console.log(error);
      console.log(init);
      setTimeout(() => {
        if (init !== "") {
          if (init === true) {
            if (users.admin === true) {
              return navigate("/home");
            } else {
              return navigate("/user");
            }
          } else {
            return navigate("/registro");
          }
        }
      }, 2000);
    };
    checkUser();
  }, [init, user, users, navigate, id, dispatch]);

  return (
    <div>
      <div className=" bg-indigo-200 min-h-screen flex justify-center items-center">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default Loading;
