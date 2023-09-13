import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gad } from "../../redux/actions/paginas/adult.js";

const Adultcorte = () => {
  const dispatch = useDispatch();
  const coad = useSelector((state) => state.coad);

  useEffect(() => {
    dispatch(gad());
  }, [dispatch]);

  const tcoad = coad[0] && coad?.map((x) => x.creditos).reduce((x, y) => x + y).toFixed(2);

  return (
    <div>
      <div className="mt-8 font-bold m-6 px-10 py-3 bg-fuchsia-300 max-w-lg">
        <h2 className="f text-2xl text-center text-fuchsia-700">
          Total Adult Regular: ${tcoad}
        </h2>
      </div>
    </div>
  );
};

export default Adultcorte;
