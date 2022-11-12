"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Auth from "../../../../auth/auth";
import FullScreenLoading from "../../../../components/full-screen-loading/FullScreenLoading";
import useCallOnce from "../../../../hooks/useCallOnce";
import useUser from "../../../../hooks/useUser";

const getOauthUser = async (url: string) => {
  await Auth.instance.loginWithGoogle(url);
};

const Page = () => {
  const router = useRouter();

  const user = useUser();

  useCallOnce(() => getOauthUser(window.location.href));

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  return <FullScreenLoading />;
};

export default Page;
