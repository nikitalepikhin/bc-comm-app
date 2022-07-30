import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import CancelHeroIcon from "../../common/icons/CancelHeroIcon";
import classNames from "classnames";

interface AddSchoolMessagePropsType {
  message: string | undefined;
  setMessage: Dispatch<SetStateAction<string | undefined>>;
  isError?: boolean;
}

const AddSchoolFeedback: React.FC<AddSchoolMessagePropsType> = ({ message, setMessage, isError = false }) => {
  return (
    <div className="flex flex-row justify-between items-center gap-6 border border-gray-300 rounded-md px-4 py-2 hover:border-gray-500 w-full md:max-w-md">
      <div className="flex flex-col justify-center items-center text-center w-full">
        <div className={classNames("font-bold", { "text-lime-600": !isError }, { "text-red-600": isError })}>
          {message}
        </div>
        {!isError && (
          <div className="text-center">
            You can find it in the{" "}
            {
              <Link to="/schools" className="text-blue-600 hover:text-blue-800 hover:underline">
                schools table
              </Link>
            }
            .
          </div>
        )}
      </div>
      <button type="button" onClick={() => setMessage(undefined)} className="hover:bg-gray-200 rounded-full p-1">
        <CancelHeroIcon />
      </button>
    </div>
  );
};

export default AddSchoolFeedback;
