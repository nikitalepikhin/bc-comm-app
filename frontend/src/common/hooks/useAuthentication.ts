import { useRefreshTokenMutation } from "../../app/enhancedApi";
import { useEffect } from "react";

const useAuthentication = () => {
  const [refreshToken] = useRefreshTokenMutation({ fixedCacheKey: "refresh-token-sub" });

  useEffect(() => {
    refreshToken();
  }, []);
};

export default useAuthentication;
