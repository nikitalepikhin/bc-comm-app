import { useRefreshTokenMutation } from "../../app/enhancedApi";
import { useEffect } from "react";

const useAuthentication = () => {
  const [refreshToken, { isLoading, isUninitialized }] = useRefreshTokenMutation();

  useEffect(() => {
    refreshToken();
  }, []);

  return { isLoading, isUninitialized };
};

export default useAuthentication;
