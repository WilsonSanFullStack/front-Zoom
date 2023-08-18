import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gad } from "../../redux/actionAdult.js";
import { gam } from "../../redux/actionAmateur.js";
import { gbo } from "../../redux/actionBonga.js";

const Adultcorte = () => {
  const dispatch = useDispatch();
  const coad = useSelector((state) => state.coad);
  const coam = useSelector((state) => state.coam);

  useEffect(() => {
    dispatch(gad());
    dispatch(gam());
    dispatch(gbo())
    dispatch(gca())
  }, [dispatch]);

  const tcoad = coad[0] && coad?.map((x) => x.creditos).reduce((x, y) => x + y).toFixed(2);
  const tcoam = coam[0] && coam?.map((x) => x.dolares).reduce((x, y) => x + y).toFixed(2);


  return (
    <div>
      <div className="mt-8 font-bold m-6 px-10 py-3 bg-fuchsia-300 max-w-lg">
        <h2 className="f text-2xl text-center text-fuchsia-700">
          Total Adult Regular: ${tcoad}
        </h2>
        <h2>Total Amateur: ${tcoam}</h2>
      </div>
    </div>
  );
};

export default Adultcorte;
