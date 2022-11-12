import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState } from "react";
import AuthLocalDb from "../auth/auth-local-db";
import { UserWithToken } from "../types";

const useUser = (): UserWithToken | null => {
  const [user, setState] = useState<UserWithToken | null>(null);

  const db = useMemo(() => new AuthLocalDb(), []);

  useLiveQuery(() => {
    db.user.toArray().then((users) => {
      setState(users && users.length ? users[0] : null);
    });
  }, [db]);

  return user;
};

export default useUser;
