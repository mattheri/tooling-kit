import { useRouter } from "next/navigation";
import { useMemo } from "react";
import AuthLocalDb from "../auth/auth-local-db";

interface Props {
  redirect?: string;
}

type SignOutHook = (props?: Props) => () => Promise<void>;

const useSignOut: SignOutHook = (props) => {
  const db = useMemo(() => new AuthLocalDb(), []);
  const router = useRouter();

  const signOut = async () => {
    await db.user.clear();

    if (props?.redirect) {
      router.push(props.redirect);
    }
  };

  return signOut;
};

export default useSignOut;
