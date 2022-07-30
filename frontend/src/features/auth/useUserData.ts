import { useAppSelector } from "../../app/hooks";

const useUserData = () => {
  const { present, user } = useAppSelector((state) => state.auth);

  return {
    present,
    ...user,
  };
};

export default useUserData;
