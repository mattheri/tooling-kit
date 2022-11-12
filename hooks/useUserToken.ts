import useUser from "./useUser";

const useUserToken = () => {
  const user = useUser();

  return user?.token ?? null;
};

export default useUserToken;
