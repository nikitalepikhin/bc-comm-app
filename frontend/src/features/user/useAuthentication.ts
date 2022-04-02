import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { refreshToken } from "../token/tokenSlice";

export const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);

  // refresh token on mount
  useEffect(() => {
    if (!email) dispatch(refreshToken());
  }, [dispatch, email]);
};
