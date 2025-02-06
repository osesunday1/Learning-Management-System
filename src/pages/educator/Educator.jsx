import { Outlet } from "react-router-dom";

const Educator = () => {
  return (
    <div>
      <h1> Educator Component </h1>
      <div>
        {<Outlet/>}
      </div>
    </div>
  );
};

export default Educator;