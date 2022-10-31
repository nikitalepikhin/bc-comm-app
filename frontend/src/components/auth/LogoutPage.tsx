import classNames from "classnames";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogOutMutation } from "../../app/enhancedApi";
import { useAppDispatch } from "../../app/redux/hooks";
import { logOut } from "../../app/redux/slice/authSlice";
import LoadingSpinner from "../uilib/LoadingSpinner";

export default function LogoutPage() {
  const [initlogOut, { isSuccess, isError }] = useLogOutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    initlogOut();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      dispatch(logOut());
    }
  }, [isSuccess, isError]);

  return (
    <div className={classNames("h-screen w-full", "flex flex-col justify-center items-center gap-2")}>
      <LoadingSpinner size="h-10 w-10">Logging out...</LoadingSpinner>
    </div>
  );
}
