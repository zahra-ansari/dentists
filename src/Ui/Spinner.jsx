import { ClimbingBoxLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClimbingBoxLoader color="#3fc9fc" size={20} />
    </div>
  );
}

export default Spinner;
