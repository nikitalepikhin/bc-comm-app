import { useAppSelector } from "../app/redux/hooks";

const useUserData = () => {
  const { present, user } = useAppSelector((state) => state.auth);

  return {
    present,
    ...user,
  };
};

export default useUserData;
